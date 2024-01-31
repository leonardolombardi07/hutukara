import { query, doc, setDoc, deleteDoc } from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getUserSubCollections } from "./utils";

function useUserRatings(userId: string) {
  const { ratingsCol } = getUserSubCollections(userId);
  return useCollectionDataWithIds(query(ratingsCol));
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

export { useUserRatings, rateContent, deleteContentRating };
