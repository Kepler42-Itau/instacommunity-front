import { createContext } from "react";

interface UserCtx {
  user: null | any,
  userBackend: null | any
}

export const UserContext = createContext({ user: null,  userBackend: null } as UserCtx);
