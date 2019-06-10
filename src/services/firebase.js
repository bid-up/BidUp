const config = {
    apiKey: 'AIzaSyAKCVpeBXoCP9K1F4azCmIdBC6CzUdsZ18',
    authDomain: 'bidup-e0118.firebaseapp.com',
    databaseURL: 'https://bidup-e0118.firebaseio.com',
    projectId: 'bidup-e0118',
    storageBucket: 'bidup-e0118.appspot.com',
    messagingSenderId: '887377005660',
    appId: '1:887377005660:web:accab8653d26664c'
};

export const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();

export const usersRef = db.ref('users');
export const lotsRef = db.ref('lots');
export const usersByLotRef = db.ref('usersByLot');
export const productsRef = db.ref('products');
export const productsByLotRef = db.ref('productsByLot');