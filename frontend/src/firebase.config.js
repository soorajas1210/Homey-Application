
import {initializeApp} from "firebase/app" 
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAf8W6jWnCNZO3qGSq6LehjuOvRMD3E18o",
  authDomain: "homey-f701b.firebaseapp.com",
  projectId: "homey-f701b",
  storageBucket: "homey-f701b.appspot.com",
  messagingSenderId: "676212999423",
  appId: "1:676212999423:web:d788fb4ae04539bcccb8ca",
};

// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// export default db;

const app = initializeApp(firebaseConfig);
export const storage_bucket = getStorage(app)
export const auth = getAuth(app)

