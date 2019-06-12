import '../utils/check-auth.js';
import ResultsApp from './ResultsApp.js';
import { auth } from '../services/firebase.js';

const root = document.getElementById('app');

auth.onAuthStateChanged(() => {
    const app = new ResultsApp();
    root.appendChild(app.render());
});