import type { NextOrObserver, User } from "firebase/auth";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
} from "firebase/auth";
import { getServices } from "../services";

const { auth } = getServices();

async function signOut() {
  return firebaseSignOut(auth);
}

function onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
  return firebaseOnAuthStateChanged(auth, nextOrObserver);
}

function getAuthenticatedUser() {
  if (!auth.currentUser) {
    throw new Error("User is not authenticated");
  }
  return auth.currentUser;
}

export { signOut, onAuthStateChanged, getAuthenticatedUser };
