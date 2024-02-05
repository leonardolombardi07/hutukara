import { query, where, getDocs, documentId } from "firebase/firestore";
import { getGroupById } from "../../index";
import { getCollectionGroups, getCollections } from "../../../utils";
import { getUsers } from "../../../index";
import { GroupsCol } from "@/modules/api/types";

const { ratingsCollGroup } = getCollectionGroups();
const { contentCol } = getCollections();

export async function getMatchInput(
  groupId: string
): Promise<GroupsCol.MatchesSubCol.InputSubCol.Doc> {
  const group = await getGroupById(groupId);

  const allMembersIds = [group.ownerId, ...group.hostIds, ...group.memberIds];

  if (process.env.NODE_ENV === "production" && allMembersIds.length < 2) {
    throw new Error(
      `Only ${allMembersIds.length} members in the group. Need at least 2 members to create a match`
    );
  }

  const [allMembers, ratingsSnap] = await Promise.all([
    getUsers(allMembersIds),
    getDocs(query(ratingsCollGroup, where("userId", "in", allMembersIds))),
  ]);

  const contentIds = ratingsSnap.docs.map((d) => d.data().contentId);
  if (contentIds.length === 0) {
    throw new Error(
      `No rated content for members in the group. Need at least 1 rated content to create a match`
    );
  }

  const contentSnap = await getDocs(
    query(
      contentCol,
      where(documentId(), "in", Array.from(new Set(contentIds)))
    )
  );

  const ratings = ratingsSnap.docs.map((d) => d.data());
  const content = contentSnap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return {
    group,
    allMembers,
    ratings: ratingsSnap.docs.map((d) => d.data()),
    content,
  };
}
