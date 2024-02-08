import OMBDBApi from "@/modules/OMDBApi";
import { getCollections } from "../utils";
import { documentId, query, where, getDocs } from "firebase/firestore";

const { contentCol } = getCollections();

async function getContentOfIdsThatAreNotInTheDatabase(ids: string[]) {
  // To spare OMDB requests, we check if the content already exists in the database
  const q = query(contentCol, where(documentId(), "in", ids));
  const snap = await getDocs(q);
  const idsInDb = snap.docs.filter((d) => d.exists()).map((d) => d.id);
  const idsNotInDb = ids.filter((id) => idsInDb.includes(id) === false);
  return idsNotInDb;
}

export { getContentOfIdsThatAreNotInTheDatabase };
