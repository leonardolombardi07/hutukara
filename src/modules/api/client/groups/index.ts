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
  getDoc,
  serverTimestamp,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useCollectionDataWithIds } from "../utils/hooks";
import { useDocumentData } from "react-firebase-hooks/firestore";

const { groupsCol } = getCollections();

async function getGroupById(id: string) {
  const snap = await getDoc(doc(groupsCol, id));

  if (!snap.exists()) {
    throw new Error("Not found");
  }

  return { id: snap.id, ...snap.data() };
}

async function joinGroup({ userId, pin }: { userId: string; pin: string }) {
  const snap = await getDocs(query(groupsCol, where("pin", "==", pin)));

  const groupDoc = snap.docs.find((d) => d.exists());
  if (!groupDoc) {
    throw new Error("Not found. Try a different pin.");
  }

  const group = groupDoc.data();
  if ([group.ownerId, ...group.hostIds, ...group.memberIds].includes(userId)) {
    throw new Error("You are already a member.");
  }

  await setDoc(
    doc(groupsCol, groupDoc.id),
    { memberIds: arrayUnion(userId) },
    { merge: true }
  );

  return { id: groupDoc.id, ...group };
}

async function createGroup({
  ownerId,
  name,
}: {
  ownerId: string;
  name: string;
}) {
  const doc = await addDoc(groupsCol, {
    ownerId,
    name,
    createdAt: serverTimestamp(),
    pin: Math.random().toString(36).substring(7),
    hostIds: [],
    memberIds: [],
    matchIds: [],
  });

  return { id: doc.id };
}

async function deleteGroup(id: string) {
  await deleteDoc(doc(groupsCol, id));
}

function useUserGroups(userId: string) {
  return useCollectionDataWithIds(
    query(
      groupsCol,
      or(
        where("ownerId", "==", userId),
        where("memberIds", "array-contains", userId),
        where("hostIds", "array-contains", userId)
      ),
      orderBy("createdAt", "desc")
    )
  );
}

function useGroup(groupId: string) {
  return useDocumentData(doc(groupsCol, groupId));
}

export {
  joinGroup,
  createGroup,
  getGroupById,
  useGroup,
  useUserGroups,
  deleteGroup,
};
export * from "./matches";
