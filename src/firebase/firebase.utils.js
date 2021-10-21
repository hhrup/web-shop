import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  addDoc,
  doc,
  CollectionReference,
  deleteDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWlV_PiSF1MDOjD42RBtK_QzaD-3CNbqE',
  authDomain: 'web-shop-953a5.firebaseapp.com',
  projectId: 'web-shop-953a5',
  storageBucket: 'web-shop-953a5.appspot.com',
  messagingSenderId: '419723364161',
  appId: '1:419723364161:web:1111651210b7359ef443c0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get a list of cities from your database
export async function getDocuments() {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  console.log(citySnapshot.docs.map((doc) => doc.id));
  const cityList = citySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return cityList;
}

export async function addDocument() {
  try {
    const docRef = await addDoc(collection(db, 'cities'), {
      name: 'Lovelace',
      population: 34501,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

export async function deleteDocument() {
  try {
    await deleteDoc(doc(db, 'cities', 'eq2L6pmS3h2dpeTlr1Do'));
  } catch (e) {
    console.error('Error deleting document: ', e);
  }
}
