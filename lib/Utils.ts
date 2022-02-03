import { auth } from "./Firebase";

export const makeURL = (path = "/") => {
  const host = "api.instacommunity.net";
  const defaultUrl = `https://${host}`;
  return `${defaultUrl}${path}`;
};

export const getToken = async () => {
  let token: string | void;
  token = await auth.currentUser
    ?.getIdToken(true)
    .catch((error) => console.log(error));
  return token;
};

export const generateHeaders = (idToken: string | void | undefined) => {
  if (idToken) {
    return [
      ["Content-Type", "application/json"],
      ["Authorization", `Bearer ${idToken}`],
    ];
  } else {
    return [["Content-Type", "application/json"]];
  }
};
