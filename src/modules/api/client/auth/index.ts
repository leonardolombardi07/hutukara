import type { NextOrObserver, User } from "firebase/auth";
import {
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  createUserWithEmailAndPassword,
  UserCredential,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { _signInWithPopup } from "./internal";
import { getServices } from "../services";
import { getCollections } from "../utils";

const { auth } = getServices();
const { usersCol } = getCollections();

interface SignUpWithEmailAndPasswordForm {
  name: string;
  email: string;
  password: string;
}

async function signUp(provider: "google"): Promise<UserCredential>;
async function signUp(
  provider: "email/password",
  { name, email, password }: SignUpWithEmailAndPasswordForm
): Promise<UserCredential>;

async function signUp(
  provider: "email/password" | "google",
  form?: SignUpWithEmailAndPasswordForm
) {
  let userCredential: UserCredential | null = null;

  if (provider === "google") {
    userCredential = await _signInWithPopup({ provider: "google" });
  } else if (provider === "email/password") {
    throwErrorIfNoForm(form);
    userCredential = await createUserWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );
    await updateProfile(userCredential.user, { displayName: form.name });
  } else {
    throw new Error("Provider not supported");
  }

  const { user } = userCredential;
  await createUserOnFirestoreIfDoesNotExist(user.uid, {
    name: user.displayName || "",
    photoURL: user.photoURL || "",
  });

  return userCredential;
}

interface SignInWithEmailAndPasswordForm {
  email: string;
  password: string;
}

async function signIn(provider: "google"): Promise<UserCredential>;
async function signIn(
  provider: "email/password",
  { email, password }: SignInWithEmailAndPasswordForm
): Promise<UserCredential>;

async function signIn(
  provider: "email/password" | "google",
  form?: SignInWithEmailAndPasswordForm
) {
  let userCredential: UserCredential | null = null;

  if (provider === "google") {
    userCredential = await _signInWithPopup({ provider: "google" });
  } else if (provider === "email/password") {
    throwErrorIfNoForm(form);
    userCredential = await firebaseSignInWithEmailAndPassword(
      auth,
      form.email,
      form.password
    );
  } else {
    throw new Error("Provider not supported");
  }

  const { user } = userCredential;
  await createUserOnFirestoreIfDoesNotExist(user.uid, {
    name: user.displayName || "",
    photoURL: user.photoURL || "",
  });
  return userCredential;
}

function throwErrorIfNoForm<T>(form: T): asserts form is NonNullable<T> {
  // TODO: we probably can create function signatures that makes Typescript understand that form is required and not nullable
  if (!form) {
    throw new Error("Form is required");
  }
}

async function createUserOnFirestoreIfDoesNotExist(
  userId: string,
  data: {
    name: string;
    photoURL: string;
  }
) {
  const userDoc = doc(usersCol, userId);

  const snap = await getDoc(userDoc);
  if (!snap.exists()) {
    setDoc(userDoc, { ...data, groupIds: [] });
  }
}

async function signOut() {
  return firebaseSignOut(auth);
}

function onAuthStateChanged(nextOrObserver: NextOrObserver<User>) {
  return firebaseOnAuthStateChanged(auth, nextOrObserver);
}

function sendPasswordResetEmail(email: string) {
  return firebaseSendPasswordResetEmail(auth, email);
}

export { signOut, onAuthStateChanged, sendPasswordResetEmail, signIn, signUp };
