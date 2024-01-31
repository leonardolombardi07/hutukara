import { getCollections } from "../utils";
import {
  doc,
  getDocs,
  query,
  setDoc,
  where,
  or,
  arrayUnion,
  addDoc,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";

const { groupsCol } = getCollections();

function useUserGroups(userId: string) {
  return useCollectionDataWithIds(
    query(
      groupsCol,
      or(
        where("ownerId", "==", userId),
        where("memberIds", "array-contains", userId),
        where("hostIds", "array-contains", userId)
      )
    )
  );
}

async function joinGroup({ userId, pin }: { userId: string; pin: string }) {
  const snap = await getDocs(query(groupsCol, where("pin", "==", pin)));

  const firstDoc = snap.docs.find((d) => d.exists());
  if (!firstDoc) {
    throw new Error("Group not found");
  }

  return setDoc(
    doc(groupsCol, firstDoc.id),
    { memberIds: arrayUnion(userId) },
    { merge: true }
  );
}

function createGroup({ ownerId, name }: { ownerId: string; name: string }) {
  return addDoc(groupsCol, {
    ownerId,
    name,
    createdAt: Date.now(),
    hostIds: [],
    memberIds: [],
    pin: Math.random().toString(36).substring(7),
  });
}

export { useUserGroups, joinGroup, createGroup };
