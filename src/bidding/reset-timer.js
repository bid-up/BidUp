import { activeLotsRef } from '../services/firebase.js';

function resetTimer(lotKey) {
    const startDate = new Date().getTime();
    const endDate = startDate + 6000;

    const deadline = new Date(endDate).getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;
        const seconds = Math.ceil(timeRemaining % (1000 * 60) / 1000);
        console.log(seconds);
        activeLotsRef
            .child(lotKey)
            .child('timeRemaining')
            .set({ time: seconds });
        if(timeRemaining < 0) {
            clearInterval(interval);
            console.log('time is less than 0');
        }
    }, 1000);
}

export default resetTimer;