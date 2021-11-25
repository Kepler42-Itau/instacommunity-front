import Community from "../models/Community";

const makeUrl = (path = "/") => {
  const defaultUrl = "http://localhost:8080";
  return `${defaultUrl}${path}`;
};

class API {
  async getFollowedCommunities(userId: String): Promise<Community[]> {
    const communities: Community[] = await fetch(
      makeUrl(`/users/${userId}/communities`)
    ).then((res) => {
      if (res.ok) return res.json();
      else {
        console.error({ res });
        return new Promise(() => []);
      }
    });
    return communities;
  }
}

export default new API();
