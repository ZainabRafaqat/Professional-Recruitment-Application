// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAXR2O0MesBpTPpDFwXXNxNKpF4P2vWo0g",
  authDomain: "fypimages-1b1e2.firebaseapp.com",
  projectId: "fypimages-1b1e2",
  storageBucket: "fypimages-1b1e2.appspot.com",
  messagingSenderId: "672659244346",
  appId: "1:672659244346:web:81a0d7691bb1d2d8813c03"
};

const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)