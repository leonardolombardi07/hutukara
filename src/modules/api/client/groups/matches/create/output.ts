import { saveContentById } from "../../../index";
import OpenAIApi from "@/modules/OpenAIApi";
import { GroupsCol } from "@/modules/api/types";
import { z } from "zod";
import { findContentInDb } from "../../../content/internal";
import { unwrapPromiseSettled } from "@/modules/asyncUtils";

export async function getMatchOutput(
  input: GroupsCol.MatchesSubCol.InputSubCol.Doc
) {
  const { recommendations } = await requestRecommendationsToOpenAI(input);

  const content = await getContentFromRecommendations(recommendations);

  return {
    recommendations,
    content,
  };
}

// Interface to copy on the text below
// TODO: ideally we should have a function able to generate a string from the interface at runtime
interface Recommendation {
  /* Title of the movie or series */
  Title: string;

  /* Score, from 0 to 1, based on how much the recommended content matches the preferences of all users.*/
  score: number;

  /* Possible IMDB id of the recommended content */
  possibleIMDBId: string;

  /* Possible URL of the recommended content's poster */
  possiblePoster: string;
}

async function requestRecommendationsToOpenAI(
  input: GroupsCol.MatchesSubCol.InputSubCol.Doc
) {
  const promptInitialMessage = `You are a movie and series recomender. Below, you'll find a text with a list of titles and the scores (from 0 to 5) given by users, in the CSV format of "Title,Person 1,Person 2,...":`;

  const promptFinalMessage = `Based on the titles and scores above,  give a list of 5 recommended movies and series (necessarily not in the list above) conforming to the following interface:

  interface Recommendation {
    /* Title of the movie or series */
    Title: string;
  
    /* Score, from 0 to 1, based on how much the recommended content matches the preferences of all users.*/
    score: number;
  
    /* Possible IMDB id of the recommended content */
    possibleIMDBId: string;
  
    /* Possible URL of the recommended content's poster */
    possiblePoster: string;
  }
  
  Answer with a JSON - and only a JSON.`;

  const dataAsCSV = getDataAsCSV(input);

  const prompt = `${promptInitialMessage}\n${dataAsCSV}\n${promptFinalMessage}`;

  const completion = await OpenAIApi.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "system", content: prompt }],
  });

  const maybeJSONAsString = completion?.choices[0]?.message?.content;
  if (!maybeJSONAsString) {
    throw new Error("AI did not return a JSON");
  }

  // TODO: maybe sanitize the JSON here
  const json = parseToJson(maybeJSONAsString);
  const recommendations = validateJSON(json);

  return { recommendations };
}

function validateJSON(json: any) {
  const Recommendation: z.ZodType<Recommendation> = z.object({
    Title: z.string(),
    score: z.number().gte(0).lte(1),
    possibleIMDBId: z.string(),
    possiblePoster: z.string(),
  });
  const array = z.array(Recommendation);
  return array.parse(json);
}

function parseToJson(jsonAsString: string) {
  // TODO: handle errors
  return JSON.parse(jsonAsString);
}

async function getContentFromRecommendations(
  recommendations: Recommendation[]
) {
  const candidateContentIds = recommendations.map((r) => r.possibleIMDBId);

  const { contentInDb, idsNotInDb } = await findContentInDb(
    candidateContentIds
  );

  // The content ids may not event exist, so we don't want to throw an error here. Let's just get and save the content we can
  const responses = await Promise.allSettled(
    idsNotInDb.map((id) => saveContentById(id))
  );
  const [savedContent, errors] = unwrapPromiseSettled(responses);

  if (errors.length > 0) {
    console.error("Errors saving content: ", errors);
  }

  const content = [...contentInDb, ...savedContent];

  const contentWithScores = content.map((c) => {
    const recommendation = recommendations.find(
      (r) => r.possibleIMDBId === c.imdbID
    );
    if (!recommendation) {
      // Not sure if we should throw an error here... this probably won't happen but...
      throw new Error("Recommendation not found");
    }

    return { ...c, score: recommendation.score };
  });

  return contentWithScores;
}

function getDataAsCSV(input: GroupsCol.MatchesSubCol.InputSubCol.Doc) {
  const { allMembers, content, ratings } = input;

  const header = ["Title", ...allMembers.map((member) => member.name)];
  const rows = content.map((item) => {
    const row = [item.Title];
    allMembers.forEach((member) => {
      const rating = ratings.find(
        (rating) => rating.userId === member.id && rating.contentId === item.id
      );
      row.push(rating ? String(rating.value) : "");
    });
    return row;
  });

  return [header, ...rows].map((row) => row.join(",")).join("\n");
}
