import { orderBy, limit, query } from "firebase/firestore";
import { getGroupsSubCollections } from "../utils";
import { useCollectionDataWithIds } from "../../utils/hooks";
import { GroupsCol } from "../../../types";

function useGroupMostRecentMatch(
  groupId: string
): [GroupsCol.MatchesSubCol.Doc | null, boolean, Error | undefined] {
  const { matchesCol } = getGroupsSubCollections(groupId);
  const [data = [], loading, error] = useCollectionDataWithIds(
    query(matchesCol, orderBy("createdAt", "desc"), limit(1))
  );
  return [data[0], loading, error];
}

export { useGroupMostRecentMatch };
export * from "./findMatches";
