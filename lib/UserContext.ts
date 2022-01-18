import { createContext } from "react";
import { User } from "firebase/auth";
import userBackend from "../models/User";

interface UserCtx {
  user: null | User | undefined;
  userBackend: null | userBackend;
  setUserBackend: Function;
}

export const UserContext = createContext({
  user: null,
  userBackend: null,
  setUserBackend: Function,
} as UserCtx);
