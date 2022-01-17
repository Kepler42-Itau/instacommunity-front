import { createContext } from "react";

interface UserCtx {
  user: null | any,
  userBackend: null | any
  setUserBackend: null | any
}

export const UserContext = createContext({ user: null,  userBackend: null, setUserBackend: null } as UserCtx);
