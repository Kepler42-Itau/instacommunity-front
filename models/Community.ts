interface Community {
  id?: number;
  name: string;
  description: string;
  contact1: string;
  contact2?: string;
  contact3?: string;
  creator: string;
  slug: string;
  photoURL?: string;
  type: string;
}

export default Community;
