// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAMy8zHlhQ89lO4SOMHQQ1ALcHyCv56l4I',
  authDomain: 'chat-room-178fe.firebaseapp.com',
  projectId: 'chat-room-178fe',
  storageBucket: 'chat-room-178fe.appspot.com',
  messagingSenderId: '747880314320',
  appId: '1:747880314320:web:9f193419e195d1c788f5d5',
  measurementId: 'G-Q1YZYKTC6E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();

    const auth = getAuth();

    const { user } = await signInWithPopup(auth, provider);

    return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
    if (error.code !== 'auth/cancelled-popup-request') {
      console.error(error);
    }

    return null;
  }
}

async function sendMessage(roomId, user, text) {
  try {
    await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
      uid: user.uid,
      displayName: user.displayName,
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(
      collection(db, 'chat-rooms', roomId, 'messages'),
      orderBy('timestamp', 'asc')
    ),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(messages);
    }
  );
}

export { loginWithGoogle, sendMessage, getMessages };
