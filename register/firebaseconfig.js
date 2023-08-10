  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
  import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
  
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
  import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc, deleteDoc, updateDoc , serverTimestamp , onSnapshot ,orderBy,
  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";
  
//   import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
//    import {
//     getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc, deleteDoc, updateDoc
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
// import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-storage.js";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
// import {
//     getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc, deleteDoc, updateDoc
// } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDs3ynX_fB3zSUKdKl07ER1HRUq_EMDyyg",
  authDomain: "chat-app-64e2a.firebaseapp.com",
  projectId: "chat-app-64e2a",
  storageBucket: "chat-app-64e2a.appspot.com",
  messagingSenderId: "278279333249",
  appId: "1:278279333249:web:5d86cf87c68acc8676f480"
};


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  // const storage = getStorage(app);
  
  
  
  export{
      auth,
      app,
      db,
      getFirestore,
      collection,
      addDoc,
      setDoc,
      doc,
      getDoc,
      getAuth,
      createUserWithEmailAndPassword,
      query,
      where,
      getDocs,
      signInWithEmailAndPassword,
      onAuthStateChanged,
      signOut,
      // storage,
      ref,
      uploadBytesResumable,
      getDownloadURL,
      deleteDoc,
      updateDoc,
      serverTimestamp,
      onSnapshot,
      orderBy,
  };

