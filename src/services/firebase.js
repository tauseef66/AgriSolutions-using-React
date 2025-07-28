import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXOnu3EUlyacCxOyQewAOY0LcZOB0mhlw",
  authDomain: "agrisolutions-cb9f8.firebaseapp.com",
  projectId: "agrisolutions-cb9f8",
  storageBucket: "agrisolutions-cb9f8.appspot.com",
  messagingSenderId: "979546217033",
  appId: "1:979546217033:web:f8a522f155be071522bd98",
  measurementId: "G-Y4D2K66M63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };