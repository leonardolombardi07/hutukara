import {
  query,
  where,
  documentId,
  setDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getCollections } from "../utils";
import { useUserRatings } from "../users";
import { ContentCol } from "../../types";
import { CONTENT_SAMPLE } from "./data";
import OMBDBApi, { OMBDBResponse } from "@/modules/OMDBApi";
import { getServices } from "../services";

const { firestore } = getServices();
const { contentCol } = getCollections();

function useUserRatedContent(userId: string) {
  const [ratings, loadingRatings, errorRatings] = useUserRatings(userId);

  const contentIds = ratings?.map((r) => r.contentId) || [];

  const userRatedContentQuery =
    contentIds.length === 0
      ? null
      : query(contentCol, where(documentId(), "in", contentIds));

  const [data, loading, error] = useCollectionDataWithIds(
    userRatedContentQuery
  );

  return [{ data, ratings }, loading || loadingRatings, error || errorRatings];
}

function useContentToBrowse() {
  return [CONTENT_SAMPLE, false, undefined] as const;
}

async function searchContent(searchQuery: string): Promise<ContentCol.Doc[]> {
  const ombdResponse = await OMBDBApi.search(searchQuery);

  try {
    upsertOnFirestore(ombdResponse);
  } catch (error) {
    // TODO: log error or something like that, but don't throw
  }
  return ombdResponse;

  function upsertOnFirestore(items: OMBDBResponse[]) {
    const batch = writeBatch(firestore);

    for (const item of items) {
      batch.set(doc(contentCol, item.imdbID), item);
    }

    return batch.commit();
  }
}

export { useUserRatedContent, searchContent, useContentToBrowse };
