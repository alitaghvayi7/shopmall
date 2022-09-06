import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  getDoc,
  setDoc,
  doc,
  getFirestore,
  getDocs,
  collection,
  writeBatch,
  query
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHTet-34VzMfT8-j3s_7kqYgWnoD92g3k",
  authDomain: "shopmall-2eb10.firebaseapp.com",
  projectId: "shopmall-2eb10",
  storageBucket: "shopmall-2eb10.appspot.com",
  messagingSenderId: "1007256072216",
  appId: "1:1007256072216:web:7314f425efb1ee64ad536d"
};

const fireBaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const db = getFirestore();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const createUserFromGoogle = async (userAuth, additionalInformation = { displayName: '' }) => {

  if (!userAuth) {
    return
  }

  const userDocumentRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocumentRef);

  if (!userSnapshot.exists()) {
    const { email, displayName } = userAuth;
    const createdAt = new Date().toLocaleString();

    try {
      await setDoc(userDocumentRef, {
        email,
        displayName,
        createdAt,
        ...additionalInformation
      });
    }
    catch (error) {
      console.log(error);
    }
  }
  return userDocumentRef;
}

export const createUser = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const loginUser = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const userSignout = async () => {
  await signOut(auth);
}

export const connectToDataBaseAndWritngFile = async (collectionKey, jsonToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  jsonToAdd.forEach((json) => {
    const documentRef = doc(collectionRef, json.title.toLowerCase());
    batch.set(documentRef, json);
  });

  await batch.commit();
  console.log('done');
}

export const getDocumentAndCollections = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const queryMap = querySnapshot.docs.reduce((total, documentSnapshot) => {
    const {title,items} = documentSnapshot.data();
    total[title.toLowerCase()] = items;
    return total;
  }, {});
  return queryMap;
}