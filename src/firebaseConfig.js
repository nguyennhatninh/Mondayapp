import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDhd9ddmH7e4rI3rwAq6modsn7fy6f3pnk',
    authDomain: 'mondayapp-d8bca.firebaseapp.com',
    projectId: 'mondayapp-d8bca',
    storageBucket: 'mondayapp-d8bca.appspot.com',
    messagingSenderId: '568779495940',
    appId: '1:568779495940:web:c785c710efef5535977351',
    measurementId: 'G-BZ6VDR5HXW',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
