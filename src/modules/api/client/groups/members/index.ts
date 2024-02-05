import { arrayRemove, arrayUnion, doc, setDoc } from "firebase/firestore";
import { getCollections } from "../../utils";

const { groupsCol } = getCollections();

type LessSeriousRole = "member" | "host";

function changeMemberRole(
  uid: string,
  {
    oldRole,
    newRole,
    groupId,
  }: {
    oldRole: LessSeriousRole;
    newRole: LessSeriousRole;
    groupId: string;
  }
) {
  if (newRole === oldRole) {
    throw new Error("Role is already the same");
  }

  const groupDoc = doc(groupsCol, groupId);

  if (oldRole === "host" && newRole === "member") {
    return setDoc(
      groupDoc,
      {
        hostIds: arrayRemove(uid),
        memberIds: arrayUnion(uid),
      },
      { merge: true }
    );
  }

  if (oldRole === "member" && newRole === "host") {
    return setDoc(
      groupDoc,
      {
        hostIds: arrayUnion(uid),
        memberIds: arrayRemove(uid),
      },
      { merge: true }
    );
  }

  throw new Error("Invalid role change");
}

function transferOwnership(
  groupId: string,
  {
    prevOwnerUid,
    newOwnerUid,
  }: {
    prevOwnerUid: string;
    newOwnerUid: string;
  }
) {
  if (prevOwnerUid === newOwnerUid) {
    throw new Error("Owner is already the same");
  }

  const groupDoc = doc(groupsCol, groupId);

  return setDoc(
    groupDoc,
    {
      ownerId: newOwnerUid,
      hostIds: arrayUnion(prevOwnerUid),
    },
    { merge: true }
  );
}

export { changeMemberRole, transferOwnership };
