import { getCollections } from "../utils";
import {
  doc,
  getDoc,
  query,
  setDoc,
  where,
  or,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { getUser } from "../users";

const { groupsCol } = getCollections();

export async function getGroupOwner(groupId: string) {
  const snap = await getDoc(doc(groupsCol, groupId));
  if (!snap.exists()) {
    throw new Error("Group not found");
  }
  return getUser(snap.data().ownerId);
}
