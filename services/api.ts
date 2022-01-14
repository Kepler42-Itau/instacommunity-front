import Community from "../models/Community";
import User from "../models/User";
import UserCommunity from "../models/UserCommunity";
import ErrorResponse from "../models/ErrorResponse";
import { auth } from './firebase'

const makeUrl = (path = "/") => {
  const host = "localhost";
  const defaultUrl = `http://${host}:8080`;
  return `${defaultUrl}${path}`;
};

const getToken = async () =>  {
  let token: string | void;
  token = await auth.currentUser?.getIdToken(true).catch((error) => console.log(error));
  return token;
}

const generateHeaders = (idToken: string | void | undefined) => {
  if (idToken) {
    return [
      ["Content-Type", "application/json"],
      ["Authorization", `Bearer ${idToken}`]
    ]
  } else {
    return [
        ["Content-Type", "application/json"],
      ]
  }
}

class API {
  async createCommunity(community: Community): Promise<Community|ErrorResponse> {
    const idToken = await getToken();
    return fetch(makeUrl(`/communities`), {
      method: "POST",
      headers: generateHeaders(idToken),
      body: JSON.stringify(community)
    })
      .then(res => res.json())
  }

  async getFollowedCommunities(userId: string): Promise<Community[]|ErrorResponse> {

    const res = await fetch(
      makeUrl(`/users/${userId}/communities`)
    )
    if (res.ok) return res.json();
    else {
      console.error({res});
      return new Promise(() => []);
    }
  }

  async followCommunity(communityId: string, userId: string): Promise<Boolean> {
    const idToken = await getToken();
    const res = await fetch(
      makeUrl(`/communities/${communityId}/followers`), {
        method: "POST",
        headers: generateHeaders(idToken),
        body: JSON.stringify({
          id: communityId
        })
      })
    return res.ok
  }

  async unFollowCommunity(communityId: string, userId: string): Promise<Boolean> {
    const idToken = await getToken();
    const res = await fetch(
      makeUrl(`/communities/${communityId}/followers/${userId}`), {
        method: "DELETE",
        headers: generateHeaders(idToken),
      })
    return res.ok
  }

  async getUser(uid: string): Promise<User|ErrorResponse> {
    const idToken = await getToken();
    const res = await fetch(makeUrl(`/users/${uid}`), {
      method: "GET",
      headers: generateHeaders(idToken),
    })
    return res.json()
  }

  async getUserByName(username: string): Promise<User|ErrorResponse> {
    const res = await fetch(makeUrl(`/users?username=${username}`), {
      method: "GET",
      headers: [["Content-Type", "application/json"]]
    })
    return res.json()
  }

  async getFollowedCommunitiesByName(uid: string): Promise<UserCommunity|ErrorResponse> {
    const res = await fetch(makeUrl(`/users/${uid}/communities`), {
      method: "GET",
      headers: [["Content-Type", "application/json"]]
    })
    return res.json();
  }

  async updateUser(user: User): Promise<User|ErrorResponse> {
    const idToken = await getToken();
    const res = await fetch(makeUrl(`/users/${user.id}`), {
      method: "PUT",
      headers: generateHeaders(idToken),
      body: JSON.stringify(user),
    })
    return res.json()
  }

  async createNewUser(user: User): Promise<User|ErrorResponse> {
    const idToken = await getToken();
    const res = await fetch(makeUrl('/users'), {
      method: "POST",
      headers: generateHeaders(idToken),
      body: JSON.stringify(user),
    })
    return res.json()
  }

  async getCommunityPage(communityId: string):Promise<Community|ErrorResponse> {
    const idToken = await getToken();
    const res = await fetch(
      makeUrl(`/communities/${communityId}`), {
        method: "GET",
        headers: generateHeaders(idToken),
      })
    return res.json()
  }

  async getCommunitiesFollowers(communityId: String): Promise<User[]|ErrorResponse> {
      const res = await fetch(
        makeUrl(`/communities/${communityId}/followers`)
      )
      if (res.ok) return res.json();
      else {
        console.error({res});
        return new Promise(() => []);
      }
  }

  async searchCommunity(searchTerm: String): Promise<Community[]> {
    const idToken = await getToken();
    const res = await fetch(makeUrl(`/communities?${searchTerm}`), {
      method: "GET",
      headers: generateHeaders(idToken),
    })
    if (res.ok) return res.json();
    else {
      console.error({res});
      return new Promise(() => []);
    }
  }

  async updateCommunity(community: any, id: number) {
    const idToken = await getToken();
    const res = await fetch(makeUrl(`/communities/${id}`), {
      method: "PATCH",
      headers: generateHeaders(idToken),
      body: JSON.stringify(community)
    })
    if (res.ok) return res.json();
    else {
      console.error({res});
      return new Promise(() => {})
    }
  }

}

export default new API();
