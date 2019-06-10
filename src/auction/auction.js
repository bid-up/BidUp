import '../utils/check-auth.js';
import AuctionApp from './AuctionApp.js';
import { auth } from '../services/firebase.js';

const root = document.getElementById('app');

auth.onAuthStateChanged(() => {
    const app = new AuctionApp();
    root.appendChild(app.render());
});