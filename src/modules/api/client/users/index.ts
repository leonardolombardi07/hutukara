import {
  query,
  doc,
  getDoc,
  where,
  documentId,
  getDocs,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getCollections } from "../utils";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { getServices } from "../services";
import { UsersCol } from "../../types";

const { auth } = getServices();
const { usersCol } = getCollections();

async function getUser(userId: string) {
  const snap = await getDoc(doc(usersCol, userId));
  if (!snap.exists()) {
    throw new Error("Not found");
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}

async function getUsers(ids: string[]) {
  const snap = await getDocs(query(usersCol, where(documentId(), "in", ids)));
  if (snap.empty) {
    throw new Error("Not found");
  }

  if (snap.size !== ids.length) {
    throw new Error("Some not found");
  }

  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

function useFirestoreUser() {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("Not found");
  }

  return useDocumentData(doc(usersCol, userId));
}

function useUsers(
  userIds: string[]
): [(UsersCol.Doc & { id: string })[] | undefined, boolean, Error | undefined] {
  const q =
    userIds.length === 0
      ? null
      : query(usersCol, where(documentId(), "in", userIds));

  return useCollectionDataWithIds(q);
}

export { getUser, useUsers, useFirestoreUser, getUsers };
export * from "./rating";
