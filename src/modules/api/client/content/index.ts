import { doc, writeBatch } from "firebase/firestore";
import { getCollections } from "../utils";
import { CONTENT_SAMPLE } from "./data";
import { OMBDBResponse } from "@/modules/OMDBApi";
import { getServices } from "../services";
import { findContentInDb } from "./internal";
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
  const { contentInDb, idsNotInDb } = await findContentInDb(ids);

  const savedContent = await Promise.all(
    idsNotInDb.map((id) => saveContentById(id))
  );

  return [...contentInDb, ...savedContent];
}

async function getContentById(id: string) {
  const [data] = await getContentByIds([id]);
  return data;
}

export { useContentToBrowse, getContentByIds, upsertContent, getContentById };
export * from "./saving";
