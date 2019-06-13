import { activeLotsRef, lotsRef } from '../services/firebase.js';

let interval;

function resetTimer(lotKey) {
    const startDate = new Date().getTime();
    const endDate = startDate + 11000;

    const deadline = new Date(endDate).getTime();

    // clear old timer if timer is reset
    clearInterval(interval);

    interval = setInterval(() => {
        const now = new Date().getTime();
        const timeRemaining = deadline - now;
        const seconds = Math.ceil(timeRemaining % (1000 * 60) / 1000);
        activeLotsRef
            .child(lotKey)
            .child('timeRemaining')
            .set({ time: seconds });

        // When timer runs out
        if(timeRemaining < 0) {
            // get rid of timer
            clearInterval(interval);

            // delete lot but not active lot
            lotsRef
                .child(lotKey)
                .remove();
            
            // redirect to results
            window.location = `./results.html?key=${lotKey}`;
        }
    }, 1000);
}

export default resetTimer;