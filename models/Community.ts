interface Community {
  id?: number | null;
  name: string;
  description: string;
  contact1: string;
  contact2?: string | null;
  contact3?: string | null;
  admin: string;
  slug: string;
  photoURL?: string | null;
  type: string;
}

export default Community;
