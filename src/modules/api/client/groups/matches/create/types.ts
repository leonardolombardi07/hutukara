import { GroupsCol } from "@/modules/api/types";
import { CollectionReference, collection } from "firebase/firestore";
import { getGroupsSubCollections } from "../../utils";

function getMatchesSubCollections({
  groupId,
  matchId,
}: {
  groupId: string;
  matchId: string;
}) {
  const { matchesCol } = getGroupsSubCollections(groupId);

  const inputCol = collection(
    matchesCol,
    matchId,
    "input"
  ) as CollectionReference<GroupsCol.MatchesSubCol.InputSubCol.Doc>;

  return { inputCol };
}

export { getMatchesSubCollections };
