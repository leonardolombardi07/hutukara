const TITLES = [
  "City of God",
  "Parasite",
  "Whiplash",
  "Good Will Hunting",
  "The Shawshank Redemption",
  "The Invisible Guest",
  "Shutter Island",
  "Joker",
  "The Hateful Eight",
  "The Silence of the Lambs",
  "Green Book",
  "The Dark Knight",
  "A Clockwork Orange",
  "Memento",
  "Elite Squad",
].map((title, index) => ({ id: index, title }));

const USER_SCORES = {
  Leo: {
    "0": 4,
    "1": 3,
    "10": 5,
    "11": 3,
    "12": 2,
    "13": 5,
    "14": 1,
  },
  Marta: {
    "0": 5,
    "1": 4,
    "2": 5,
    "3": 3,
    "4": 3,
    "5": 5,
    "6": 2,
    "7": 5,
    "13": 1,
    "14": 5,
  },
};

const TITLES_WITH_USER_SCORES = TITLES.map((title) => {
  const scores = Object.entries(USER_SCORES).map(([user, userScores]) => {
    // @ts-ignore
    const score = userScores[title.id];
    return { user, score };
  });

  return { ...title, scores };
});

const PROMPT_INITIAL_MESSAGE = `You are a movie and series recomender. Below, you'll find a text with a list of titles and the scores (from 0 to 5) given by users, in the CSV format of "Title,Leo,Marta,...":`;

function getDataAsCSV() {
  const csv = TITLES_WITH_USER_SCORES.reduce((acc, title) => {
    const scores = title.scores.map(({ score }) => score);
    return `${acc}${title.title},${scores.join(",")}\n`;
  }, "Title,Leo,Marta\n");

  return csv;
}

interface RecommendedContent {
  /* Title of the movie or series */
  Title: string;

  /* Score, from 0 to 1, based on how much the recommended content matches the preferences of all users.*/
  matchScore: number;

  /* Possible IMDB id of the recommended content */
  possibleIMDBId: string;
}

const PROMPT_FINAL_MESSAGE = `Based on the titles and scores above,  give a list of 5 recommended movies and series (necessarily not in the list above) conforming to the following interface:

interface RecommendedContent {
  /* Title of the movie or series */
  Title: string;

  /* Score, from 0 to 1, based on how much the recommended content matches the preferences of all users.*/
  matchScore: number;

  /* Possible IMDB id of the recommended content */
  possibleIMDBId: string;
}

Answer with a JSON - and only a JSON.
`;

function createSuccintPrompt() {
  const prompt = `${PROMPT_INITIAL_MESSAGE}\n${getDataAsCSV()}\n${PROMPT_FINAL_MESSAGE}`;
  return prompt;
}
