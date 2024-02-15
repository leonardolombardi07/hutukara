import OMBDBApi from "@/modules/OMDBApi";
import { getCollections } from "../utils";
import { documentId, query, where, getDocs } from "firebase/firestore";

const { contentCol } = getCollections();

async function findContentInDb(ids: string[]) {
  // To spare OMDB requests, we check if the content already exists in the database
  const snap = await getDocs(query(contentCol, where(documentId(), "in", ids)));

  const contentInDb = snap.docs
    .filter((d) => d.exists())
    .map((d) => ({
      id: d.id,
      ...d.data(),
    }));

  const idsInDb = contentInDb.map((c) => c.id);
  const idsNotInDb = ids.filter((id) => idsInDb.includes(id) === false);

  return { contentInDb, idsNotInDb };
}

export { findContentInDb };
