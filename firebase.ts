import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase konfigürasyonun
const firebaseConfig = {
    apiKey: "AIzaSyBgUWP4ouTUK6jfqD9aXe8FxQaqALq_chk",
    authDomain: "camasirhaneapp-210e5.firebaseapp.com",
    projectId: "camasirhaneapp-210e5",
    storageBucket: "camasirhaneapp-210e5.firebasestorage.app",
    messagingSenderId: "449063161748",
    appId: "1:449063161748:web:e9157ec3105700fcbe8981",
    measurementId: "G-XJ5LVFWQRC"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Firestore instance
export const db = getFirestore(app);

// ⚠️ React Native'de Analytics kullanma
// import { getAnalytics } from "firebase/analytics";
<<<<<<< HEAD
// const analytics = getAnalytics(app); // kaldır veya yorum satırı yap
=======
// const analytics = getAnalytics(app); // kaldır veya yorum satırı yap
>>>>>>> 2906478a812202e82a6e7af9bd11f907a6657e60
