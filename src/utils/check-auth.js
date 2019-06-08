import { auth } from '../services/firebase.js';

auth.onAuthStateChanged(user => {
    if(!user) {
        window.location = './auth.html';
    }
});