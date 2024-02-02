import {
  collectionGroup,
  query,
  where,
  getDocs,
  documentId,
  addDoc,
} from "firebase/firestore";
import { getGroupById } from "../index";
import { getCollectionGroups, getCollections } from "../../utils";
import { getUsers } from "../..";
import { ContentCol, GroupsCol, UsersCol } from "@/modules/api/types";
import { getGroupsSubCollections } from "../utils";

const { ratingsCollGroup } = getCollectionGroups();
const { contentCol } = getCollections();

export async function createMatch(groupId: string) {
  const group = await getGroupById(groupId);

  const allMembersIds = [group.ownerId, ...group.hostIds, ...group.memberIds];

  const [allMembers, ratingsSnap] = await Promise.all([
    getUsers(allMembersIds),
    getDocs(query(ratingsCollGroup, where("userId", "in", allMembersIds))),
  ]);

  const contentIds = ratingsSnap.docs.map((d) => d.data().contentId);
  const contentSnap = await getDocs(
    query(
      contentCol,
      where(documentId(), "in", Array.from(new Set(contentIds)))
    )
  );

  const match = await requestMatchesToOpenAI({
    group,
    allMembers,
    ratings: ratingsSnap.docs.map((d) => d.data()),
    content: contentSnap.docs.map((d) => d.data()),
  });

  const validatedMatch = validate(match);

  const { matchesCol } = getGroupsSubCollections(groupId);
  await addDoc(matchesCol, validatedMatch);
}

async function requestMatchesToOpenAI({
  group,
  allMembers,
  content,
  ratings,
}: {
  group: GroupsCol.Doc;
  allMembers: UsersCol.Doc[];
  content: ContentCol.Doc[];
  ratings: UsersCol.RatingsSubCol.Doc[];
}): Promise<GroupsCol.MatchesSubCol.Doc> {
  return {
    group,
    allMembers,
    content,
    ratings,
    createdAt: Date.now(),
    recommendations: [], // TODO: hehe this is the hard part
  };
}

function validate<T>(value: T): T {
  // TODO
  return value;
}
