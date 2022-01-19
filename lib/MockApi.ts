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
