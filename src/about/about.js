import '../utils/check-auth.js';
import AboutApp from './AboutApp.js';
import { auth } from '../services/firebase.js';

const root = document.getElementById('app');

auth.onAuthStateChanged(() => {
    const app = new AboutApp();
    root.appendChild(app.render());
});