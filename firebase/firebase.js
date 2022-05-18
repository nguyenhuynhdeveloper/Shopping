import { initializeApp } from 'firebase/app'
import { 
    getAuth, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,   
    signInWithEmailAndPassword,
    sendEmailVerification,    
} from "firebase/auth"
import { 
    getDatabase, 
    ref ,
    set ,
    child,
    get, 
    onValue,
    push, 
    update 
} from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDu5qKycidOugdzuN20bylEK4Ck3umRM0Q",
    authDomain: "shopping-dd960.firebaseapp.com",
    databaseURL: "https://shopping-dd960-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "shopping-dd960",
    storageBucket: "shopping-dd960.appspot.com",
    appId: '1:336471410491:android:26156ba39fcf45194c591e',
    messagingSenderId: "336471410491",
}  
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const db = getDatabase()
export {
    auth,
    db,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    set,
    push,
    ref,
    sendEmailVerification,
    child,
    get,
    onValue, 
    signInWithEmailAndPassword,
    update,
}

