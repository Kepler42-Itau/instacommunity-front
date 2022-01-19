import Contact from "./Contact";

interface Community {
  id?: number | null;
  name: string;
  description: string;
  contacts: Contact[];
  admin: string;
  slug: string;
  photoURL?: string | null;
  type: string;
}

export default Community;
