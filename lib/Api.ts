import Community from "../models/Community";
import User from "../models/User";
import FollowRelation from "../models/FollowRelation";
import ErrorResponse from "../models/ErrorResponse";
import { makeURL, getToken, generateHeaders } from "./Utils";

export const createCommunity = async (
  community: Community
): Promise<Community | ErrorResponse> => {
  const idToken = await getToken();
  return fetch(makeURL(`/communities`), {
    method: "POST",
    headers: generateHeaders(idToken),
    body: JSON.stringify(community),
  }).then((res) => res.json());
};

export const getFollowedCommunities = async (
  userId: string
): Promise<Community[]> => {
  const res = await fetch(makeURL(`/users/${userId}/communities`), {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};

export const getCommunities = async (): Promise<Community[]> => {
  const res = await fetch(`http://localhost:8080/communities`, {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};

export const followCommunity = async (
  communityId: string,
  userId: string
): Promise<Boolean> => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/communities/${communityId}/followers`), {
    method: "POST",
    headers: generateHeaders(idToken),
    body: JSON.stringify(userId),
  });
  return res.ok;
};

export const unfollowCommunity = async (
  communityId: string,
  userId: string
): Promise<Boolean> => {
  const idToken = await getToken();
  const res = await fetch(
    makeURL(`/communities/${communityId}/followers/${userId}`),
    {
      method: "DELETE",
      headers: generateHeaders(idToken),
    }
  );
  return res.ok;
};

export const getUser = async (uid: string): Promise<User | ErrorResponse> => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/users/${uid}`), {
    method: "GET",
    headers: generateHeaders(idToken),
  });
  return res.json();
};

export const getUserByUsername = async (
  username: string
): Promise<User | ErrorResponse> => {
  const res = await fetch(makeURL(`/users?username=${username}`), {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });
  return res.json();
};

export const getCommunityBySlug = async (
  slug: string
): Promise<Community | ErrorResponse> => {
  const res = await fetch(makeURL(`/communities?slug=${slug}`), {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });
  return res.json();
};

export const updateUser = async (user: User): Promise<User | ErrorResponse> => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/users/${user.id}`), {
    method: "PUT",
    headers: generateHeaders(idToken),
    body: JSON.stringify(user),
  });
  return res.json();
};

export const createUser = async (user: User): Promise<User | ErrorResponse> => {
  const idToken = await getToken();
  const res = await fetch(makeURL("/users"), {
    method: "POST",
    headers: generateHeaders(idToken),
    body: JSON.stringify(user),
  });
  return res.json();
};

export const getCommunity = async (
  communityId: string
): Promise<Community | ErrorResponse> => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/communities/${communityId}`), {
    method: "GET",
    headers: generateHeaders(idToken),
  });
  return res.json();
};

export const getCommunityFollowers = async (
  communityId: String
): Promise<User[] | ErrorResponse> => {
  const res = await fetch(makeURL(`/communities/${communityId}/followers`));
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};

export const searchCommunity = async (
  searchTerm: String
): Promise<Community[]> => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/communities?name=${searchTerm}`), {
    method: "GET",
    headers: generateHeaders(idToken),
  });
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};

export const updateCommunity = async (community: Community, id: number) => {
  const idToken = await getToken();
  const res = await fetch(makeURL(`/communities/${id}`), {
    method: "PATCH",
    headers: generateHeaders(idToken),
    body: JSON.stringify(community),
  });
  if (res.ok) return res.json();
  else {
    return new Promise(() => {});
  }
};
