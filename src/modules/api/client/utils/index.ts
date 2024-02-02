import type {
  CollectionReference,
  DocumentData,
  Firestore,
  Query,
} from "firebase/firestore";
import { collection, collectionGroup } from "firebase/firestore";
import { getServices } from "../services";
import {
  UsersCol,
  ContentCol,
  GroupsCol,
  CollectionName,
} from "@/modules/api/types";

const { firestore } = getServices();

function getTypedCollection<T = DocumentData>(
  firestore: Firestore,
  name: CollectionName
) {
  return collection(firestore, name) as CollectionReference<T>;
}

function getTypedCollectionGroup<T = DocumentData>(
  ref: CollectionReference,
  name: "ratings" // TODO: type this more narrowly
) {
  return collectionGroup(firestore, name) as Query<T>;
}

function getCollections() {
  const usersCol = getTypedCollection<UsersCol.Doc>(firestore, "users");
  const contentCol = getTypedCollection<ContentCol.Doc>(firestore, "content");
  const groupsCol = getTypedCollection<GroupsCol.Doc>(firestore, "groups");
  return { usersCol, contentCol, groupsCol };
}

function getCollectionGroups() {
  const { groupsCol } = getCollections();
  const ratingsCollGroup = getTypedCollectionGroup<UsersCol.RatingsSubCol.Doc>(
    groupsCol,
    "ratings"
  );
  return { ratingsCollGroup };
}

export { getCollections, getCollectionGroups };
