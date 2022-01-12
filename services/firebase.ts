import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCt697we7YRp-XdqPNDwVYjGGWVIFUYwFk",
  authDomain: "instacommunity-7136f.firebaseapp.com",
  projectId: "instacommunity-7136f",
  storageBucket: "instacommunity-7136f.appspot.com",
  messagingSenderId: "207030608151",
  appId: "1:207030608151:web:04e10454c9f38a245b9752"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function loginWithGoogle() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("printando")
      const user = result.user;
      console.log({ result });
      console.log({ user });
    })
    .catch((error) => {
      const errorCode = error.code;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log({errorCode, email, credential});
    });
}

export async function logoutFromGoogle() {
  await signOut(auth);
}


