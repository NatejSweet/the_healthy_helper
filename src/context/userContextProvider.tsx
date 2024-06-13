import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../app/firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import firebase from "firebase/app";

const userContext = createContext<{ user: User | null } | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return unsubscribe;
  }, []);

  return (
    <userContext.Provider value={{ user }}>{children}</userContext.Provider>
  );
}

export const googleSignIn = async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error during sign in", error);
  }
};

export const logOut = () => {
  signOut(auth);
};

export function useUserContext() {
  const context = useContext(userContext);
  console.log("context:", context);
  return context?.user;
}
