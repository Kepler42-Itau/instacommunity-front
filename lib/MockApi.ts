import Community from "../models/Community";
import User from "../models/User";
import ErrorResponse from "../models/ErrorResponse";

export const getFollowedCommunities = async (
  userId: string
): Promise<Community[]> => {
  const res = await fetch(`http://localhost:8080/followedCommunities`, {
    method: "GET",
    headers: [["Content-Type", "application/json"]],
  });
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};

export const getUser = async (uid: string): Promise<User | ErrorResponse> => {
  const res = await fetch(`http://localhost:8080/users/user1`, {
    method: "GET",
  });
  return res.json();
};

export const getUserByUsername = async (
  username: string
): Promise<User | ErrorResponse> => {
  const res = await fetch(`http://localhost:8080/users/${username}`, {
    method: "GET",
  });
  return res.json();
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
  return true;
};

export const unfollowCommunity = async (
  communityId: string,
  userId: string
): Promise<Boolean> => {
  return true;
};

export const getCommunity = async (
  communityId: string
): Promise<Community | ErrorResponse> => {
  const res = await fetch(`http://localhost:8080/communities/${communityId}`, {
    method: "GET",
  });
  return res.json();
};

export const getCommunityFollowers = async (
  communityId: String
): Promise<User[] | ErrorResponse> => {
  const res = await fetch("http://localhost:8080/followers");
  if (res.ok) return res.json();
  else {
    return new Promise(() => []);
  }
};
