import { query, doc, getDoc, where, documentId } from "firebase/firestore";
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
    throw new Error("User not found");
  }

  return {
    id: snap.id,
    ...snap.data(),
  };
}

function useFirestoreUser() {
  const userId = auth.currentUser?.uid;
  if (!userId) {
    throw new Error("User not found");
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

export { getUser, useUsers, useFirestoreUser };
export * from "./rating";
