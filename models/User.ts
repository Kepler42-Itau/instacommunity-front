import Contact from "./Contact";

interface User {
  id: string;
  name: string;
  username: string;
  occupation?: string;
  description?: string | null;
  email: string;
  contact?: Contact | null;
  photoURL?: string | null;
}

export default User;
