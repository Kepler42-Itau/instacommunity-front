import Contact from "./Contact";

interface User {
  id: string;
  name: string;
  username: string;
  occupation?: string;
  about?: string | null;
  email: string;
  contact?: Contact | null;
  photoURL?: string | null;
}

export default User;
