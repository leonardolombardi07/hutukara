import { GroupsCol } from "@/modules/api/types";
import { getCollections } from "../utils";
import { CollectionReference, collection } from "firebase/firestore";

const { groupsCol } = getCollections();

function getGroupsSubCollections(groupId: string) {
  const matchesCol = collection(
    groupsCol,
    groupId,
    "matches"
  ) as CollectionReference<GroupsCol.MatchesSubCol.Doc>;

  return { matchesCol };
}

export { getGroupsSubCollections };
