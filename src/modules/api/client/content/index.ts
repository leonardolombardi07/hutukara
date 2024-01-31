import { query, where, documentId, getDocs } from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getCollections } from "../utils";
import { useUserRatings } from "../users";
import { ContentCol } from "../../types";

const { contentCol } = getCollections();

function useUserRatedContent(userId: string) {
  const [ratings, loadingRatings, errorRatings] = useUserRatings(userId);

  const contentIds = ratings?.map((r) => r.contentId) || [];

  const [data, loading, error] = useCollectionDataWithIds(
    query(contentCol, where(documentId(), "in", contentIds))
  );

  return [{ data, ratings }, loading || loadingRatings, error || errorRatings];
}

async function searchContent(searchQuery: string): Promise<ContentCol.Doc[]> {
  alert("Not implemented");
  return [];
}

export { useUserRatedContent, searchContent };
