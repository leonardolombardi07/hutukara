import {
  query,
  where,
  documentId,
  doc,
  writeBatch,
  getDocs,
} from "firebase/firestore";
import { getCollections } from "../utils";
import { CONTENT_SAMPLE } from "./data";
import { OMBDBResponse } from "@/modules/OMDBApi";
import { getServices } from "../services";
import { getContentOfIdsThatAreNotInTheDatabase } from "./internal";
import { saveContentById } from "./saving";

const { firestore } = getServices();
const { contentCol } = getCollections();

function useContentToBrowse() {
  upsertSampleOnce();
  const withIds = CONTENT_SAMPLE.map((item) => ({ ...item, id: item.imdbID }));
  return [withIds, false, undefined] as const;
}

const upsertSampleOnce = (function () {
  let hasRun = false;
  return async function () {
    if (process.env.NODE_ENV === "production") return;
    if (hasRun) return;

    await upsertContent(CONTENT_SAMPLE);
    hasRun = true;
  };
})();

function upsertContent(items: OMBDBResponse[]) {
  const batch = writeBatch(firestore);

  for (const item of items) {
    batch.set(doc(contentCol, item.imdbID), item, { merge: true });
  }

  return batch.commit();
}

async function getContentByIds(ids: string[]) {
  const idsNotInDb = await getContentOfIdsThatAreNotInTheDatabase(ids);
  const idsInDb = ids.filter((id) => idsNotInDb.includes(id) === false);

  const [fetchedSnap, savedData] = await Promise.all([
    getDocs(query(contentCol, where(documentId(), "in", idsInDb))),
    Promise.all(idsNotInDb.map((id) => saveContentById(id))),
  ]);

  const fetchedData = fetchedSnap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  return [...fetchedData, ...savedData];
}

async function getContentById(id: string) {
  const [data] = await getContentByIds([id]);
  return data;
}

export { useContentToBrowse, getContentByIds, upsertContent, getContentById };
export * from "./saving";
