import { getDocs, orderBy, limit, query } from "firebase/firestore";
import { getGroupsSubCollections } from "./utils";

async function getMostRecentMatch(groupId: string) {
  const { matchesCol } = getGroupsSubCollections(groupId);

  const snap = await getDocs(
    query(matchesCol, orderBy("createdAt", "desc"), limit(1))
  );

  const doc = snap.docs[0];
  if (!doc.exists()) {
    throw new Error("No matches found");
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
}

export { getMostRecentMatch };
