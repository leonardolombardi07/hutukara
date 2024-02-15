import OMBDBApi from "@/modules/OMDBApi";
import { upsertContent } from "@/modules/api/client";
import { getCollections } from "../utils";
import { getDoc, doc } from "firebase/firestore";
import { findContentInDb } from "./internal";

const { contentCol } = getCollections();

async function saveSearchContent(
  searchResults: Awaited<ReturnType<typeof OMBDBApi.search>>["data"]
) {
  const { idsNotInDb } = await findContentInDb(
    searchResults.map((item) => item.imdbID)
  );

  const data = await Promise.all(idsNotInDb.map((id) => OMBDBApi.getById(id)));
  upsertContent(data);
}

async function saveContentIfNotInDb(id: string) {
  const dbDoc = await getDoc(doc(contentCol, id));
  if (dbDoc.exists()) {
    return;
  }

  return saveContentById(id);
}

async function saveContentById(id: string) {
  const item = await OMBDBApi.getById(id);
  upsertContent([item]);
  return { id, ...item };
}

export { saveSearchContent, saveContentById, saveContentIfNotInDb };
