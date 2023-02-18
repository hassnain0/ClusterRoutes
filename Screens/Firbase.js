import { initializeApp } from '@firebase/app';
import { getAuth } from '@firebase/auth';
import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';


 const firebaseConfig = {
  apiKey: "AIzaSyDFG5oNdk_c2RQb1oHASQQ8u7L8NjepT0Q",
  authDomain: "clusterroutes.firebaseapp.com",
  projectId: "clusterroutes",
  storageBucket: "clusterroutes.appspot.com",
  messagingSenderId: "991389857260",
  appId: "1:991389857260:web:6dacd934e6727b5f037cc9",
  measurementId: "G-JTTFH4F34G"
};

 const app=initializeApp(firebaseConfig)
    firebase.initializeApp(firebaseConfig)
   const db=firebase.firestore()
   const auth=getAuth(app);
   export  {db,auth,firebaseConfig};   





