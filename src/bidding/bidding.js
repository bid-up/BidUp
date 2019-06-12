import '../utils/check-auth.js';
import BiddingApp from './BiddingApp.js';
import { auth } from '../services/firebase.js';

const root = document.getElementById('app');

auth.onAuthStateChanged(() => {
    const app = new BiddingApp();
    root.appendChild(app.render());
});