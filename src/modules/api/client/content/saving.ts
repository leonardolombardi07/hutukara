import OMBDBApi from "@/modules/OMDBApi";
import { upsertContent } from "@/modules/api/client";
import { getCollections } from "../utils";
import {
  documentId,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

const { contentCol } = getCollections();

async function saveSearchContent(
  searchResults: Awaited<ReturnType<typeof OMBDBApi.search>>["data"]
) {
  const notInDbIds = await getContentOfIdsThatAreNotInTheDatabase(
    searchResults.map((item) => item.imdbID)
  );

  const data = await Promise.all(notInDbIds.map((id) => OMBDBApi.getById(id)));
  upsertContent(data);

  async function getContentOfIdsThatAreNotInTheDatabase(ids: string[]) {
    // To spare OMDB requests, we check if the content already exists in the database
    const q = query(contentCol, where(documentId(), "in", ids));
    const snap = await getDocs(q);
    const idsInDb = snap.docs.filter((d) => d.exists()).map((d) => d.id);
    const idsNotInDb = ids.filter((id) => idsInDb.includes(id) === false);
    return idsNotInDb;
  }
}

async function saveContentById(id: string) {
  const dbDoc = await getDoc(doc(contentCol, id));
  if (dbDoc.exists()) {
    return;
  }

  const item = await OMBDBApi.getById(id);
  upsertContent([item]);
}

export { saveSearchContent, saveContentById };
