import AuthApp from './AuthApp.js';

const root = document.getElementById('app');

const app = new AuthApp();
root.appendChild(app.render());

