import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { auth } from "../app/firebase";
import firebase from "firebase/app";
import { Monster } from "../types/monster";

const MonstersContext = createContext<
  | {
      monsters: Monster[] | null;
      setMonsters:
        | React.Dispatch<React.SetStateAction<Monster[] | null>>
        | undefined;
    }
  | undefined
>(undefined);

export function MonstersContextProvider({ children }: { children: ReactNode }) {
  const [monsters, setMonsters] = useState<Monster[] | null>([
    {
      name: "New monster",
      maxHealth: 10,
      armor: 10,
      currentHealth: 10,
    },
  ]);
  return (
    <MonstersContext.Provider value={{ monsters, setMonsters }}>
      {children}
    </MonstersContext.Provider>
  );
}

export function useMonstersContext() {
  const context = useContext(MonstersContext);
  return {
    monsters: context?.monsters,
    setMonsters: context?.setMonsters,
  };
}
