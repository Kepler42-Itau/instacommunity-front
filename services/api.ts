import Community from "../models/Community";

const makeUrl = (path = "/") => {
  const host = process.env.DB_SERVER || "localhost";
  const defaultUrl = `http://${host}:8080`;
  return `${defaultUrl}${path}`;
};

class API {
  async getFollowedCommunities(userId: string): Promise<Community[]> {
    return fetch(
      makeUrl(`/users/${userId}/communities`)
    ).then((res) => {
      if (res.ok) return res.json();
      else {
        console.error({res});
        return new Promise(() => []);
      }
    });
  }
}

export default new API();
