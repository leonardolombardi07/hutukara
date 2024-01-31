import { UsersCol } from "@/modules/api/types";
import { getCollections } from "../utils";
import { CollectionReference, collection } from "firebase/firestore";

const { usersCol } = getCollections();

function getUserSubCollections(userId: string) {
  const ratingsCol = collection(
    usersCol,
    userId,
    "ratings"
  ) as CollectionReference<UsersCol.RatingsSubCol.Doc>;

  return { ratingsCol };
}

export { getUserSubCollections };
