import {
  signInWithPopup as firebaseSignInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
} from "firebase/auth";
import { getServices } from "../services";

const { auth } = getServices();

type SupportedProvider = "google";

async function _signInWithPopup({ provider }: { provider: SupportedProvider }) {
  if (provider === "google") {
    const provider = new GoogleAuthProvider();
    return firebaseSignInWithPopup(auth, provider);
  }

  throw new Error("Provider not supported");
}

async function _signInWithEmailAndPassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return firebaseSignInWithEmailAndPassword(auth, email, password);
}

export { _signInWithPopup, _signInWithEmailAndPassword };
