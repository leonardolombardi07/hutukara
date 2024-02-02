import { addDoc, doc, setDoc, arrayUnion } from "firebase/firestore";
import { getGroupsSubCollections } from "../../utils";
import { GroupsCol } from "@/modules/api/types";
import { getMatchesSubCollections } from "./types";
import { getCollections } from "../../../utils";

const { groupsCol } = getCollections();

async function createMatch(
  groupId: string,
  {
    input,
    output,
  }: {
    input: GroupsCol.MatchesSubCol.InputSubCol.Doc;
    output: Omit<GroupsCol.MatchesSubCol.Doc["output"], "createdAt">;
  }
) {
  const { matchesCol } = getGroupsSubCollections(groupId);

  const matchId = Math.random().toString(36).substring(7);
  const docToAdd = doc(matchesCol, matchId);
  await setDoc(docToAdd, {
    createdAt: Date.now(),
    output,
  });

  const groupDoc = doc(groupsCol, groupId);
  setDoc(groupDoc, { matchIds: arrayUnion(matchId) }, { merge: true });

  const { inputCol } = getMatchesSubCollections({
    groupId,
    matchId,
  });
  addDoc(inputCol, input);
}

export { createMatch };
export * from "./input";
export * from "./output";
