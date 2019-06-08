const config = {
    // config goes here
};

export const app = firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.database();