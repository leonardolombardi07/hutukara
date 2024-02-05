import {
  query,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  QuerySnapshot,
  orderBy,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../../utils/hooks";
import { getUserSubCollections } from "../utils";
import { Observer } from "../../types";
import { UsersCol } from "../../../types";

function useUserRatings(userId: string) {
  const { ratingsCol } = getUserSubCollections(userId);
  return useCollectionDataWithIds(
    query(ratingsCol, orderBy("updatedAt", "desc"))
  );
}

function onUserRatingsSnapshot(
  userId: string,
  observer: Observer<QuerySnapshot<UsersCol.RatingsSubCol.Doc>>
) {
  const { ratingsCol } = getUserSubCollections(userId);
  return onSnapshot(query(ratingsCol, orderBy("updatedAt", "desc")), observer);
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
      userId,
      contentId,
      value,
      updatedAt: Date.now(),
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
  rateContent,
  deleteContentRating,
  onUserRatingsSnapshot,
};
