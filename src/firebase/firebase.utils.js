import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDZXIYYVFprMRYS_4T8-mpaunZOK73uR7k",
  authDomain: "crwn-db-9898.firebaseapp.com",
  databaseURL: "https://crwn-db-9898.firebaseio.com",
  projectId: "crwn-db-9898",
  storageBucket: "",
  messagingSenderId: "268100091331",
  appId: "1:268100091331:web:6d3d018d59cf594f"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef; // in case we want to use the userRefernce in our code for something
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;