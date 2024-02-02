import {
  query,
  where,
  documentId,
  doc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getCollections } from "../utils";
import { ContentCol } from "../../types";
import { CONTENT_SAMPLE } from "./data";
import OMBDBApi, { OMBDBResponse } from "@/modules/OMDBApi";
import { getServices } from "../services";

const { firestore } = getServices();
const { contentCol } = getCollections();

function useContentData(ids: string[]) {
  // TODO: rename this to "useContent"
  const q =
    ids.length === 0 ? null : query(contentCol, where(documentId(), "in", ids));
  return useCollectionDataWithIds(q);
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

    // process.env.NODE_ENV === "development" &&
    // alert("Running upsertSampleOnce...");
    await upsertOnFirestore(CONTENT_SAMPLE);
    hasRun = true;
  };
})();

function useContent(id: string) {
  // TODO: rename this to "useContentById"
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

async function getContentByIds(ids: string[]) {
  const q = query(contentCol, where(documentId(), "in", ids));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
}

export {
  searchContent,
  useContent,
  useContentToBrowse,
  useContentData,
  getContentByIds,
};
