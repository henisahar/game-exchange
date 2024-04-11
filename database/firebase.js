import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyC6k08Cz9XHln94zCHHGMgQZdO-iQtXiWI",
    authDomain: "jeu-exchange.firebaseapp.com",
    projectId: "jeu-exchange",
    storageBucket: "jeu-exchange.appspot.com",
    messagingSenderId: "1014971821909",
    appId: "1:1014971821909:web:16c522fbb9437dbb4109dc"
  };
firebase.initializeApp(firebaseConfig);
export default firebase;
