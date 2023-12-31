import { useState, useEffect } from "react";
import Firebase from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "@firebase/auth";
import app from "./firebase";

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

const auth = getAuth(app);

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  // listen for Firebase state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signIn = (email, password) =>
    signInWithEmailAndPassword(email, password);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(email, password);

  const logOut = () => signOut().then(clear);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signIn,
    createUser,
    logOut,
  };
}
