import {
  query,
  doc,
  getDoc,
  where,
  documentId,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getUserSubCollections } from "./utils";
import { getCollections } from "../utils";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { getServices } from "../services";

const { auth } = getServices();
const { usersCol } = getCollections();

function useUserRatings(userId: string) {
  const { ratingsCol } = getUserSubCollections(userId);
  return useCollectionDataWithIds(query(ratingsCol));
}

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

function useUsers(userIds: string[]) {
  return useCollectionDataWithIds(
    query(usersCol, where(documentId(), "in", userIds))
  );
}

function rateContent({
  userId,
  contentId,
  value,
}: {
  userId: string;
  contentId: string;
  value: number;
}) {
  const { ratingsCol } = getUserSubCollections(userId);
  return setDoc(
    doc(ratingsCol, contentId),
    {
      contentId,
      value,
    },
    { merge: true }
  );
}

function deleteContentRating({
  userId,
  contentId,
}: {
  userId: string;
  contentId: string;
}) {
  const { ratingsCol } = getUserSubCollections(userId);
  return deleteDoc(doc(ratingsCol, contentId));
}

export {
  useUserRatings,
  getUser,
  useUsers,
  rateContent,
  useFirestoreUser,
  deleteContentRating,
};
