interface User {
  id: string;
  name: string;
  username: string;
  occupation?: string;
  description?: string | null;
  email: string;
  contact?: string | null;
  photoURL?: string | null;
}

export default User;
