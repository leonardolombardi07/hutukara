import { query, where, documentId, doc, writeBatch } from "firebase/firestore";
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

  return [
    { data, ratings },
    loading || loadingRatings,
    error || errorRatings,
  ] as const;
}

function useContentToBrowse() {
  upsertSampleOnce();
  const withIds = CONTENT_SAMPLE.map((item) => ({ ...item, id: item.imdbID }));
  return [withIds, false, undefined] as const;
}

const upsertSampleOnce = (function () {
  let hasRun = false;
  return async function () {
    if (hasRun) return;

    process.env.NODE_ENV === "development" &&
      alert("Running upsertSampleOnce...");
    await upsertOnFirestore(CONTENT_SAMPLE);
    hasRun = true;
  };
})();

function useContent(id: string) {
  const [data, ...rest] = useCollectionDataWithIds(
    query(contentCol, where(documentId(), "==", id))
  );
  return [data?.[0], ...rest] as const;
}

async function searchContent(searchQuery: string): Promise<ContentCol.Doc[]> {
  const ombdResponse = await OMBDBApi.search(searchQuery);

  try {
    upsertOnFirestore(ombdResponse);
  } catch (error) {
    // TODO: log error or something like that, but don't throw
  }
  return ombdResponse;
}

function upsertOnFirestore(items: OMBDBResponse[]) {
  const batch = writeBatch(firestore);

  for (const item of items) {
    batch.set(doc(contentCol, item.imdbID), item);
  }

  return batch.commit();
}

export { useUserRatedContent, searchContent, useContent, useContentToBrowse };
