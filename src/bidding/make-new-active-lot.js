import { activeLotsRef } from '../services/firebase.js';

function makeNewActiveLot(lotKey) {
    activeLotsRef  
        .child(lotKey)
        .set({
            highestBid: 0,
            highestBidder: '',
            timeRemaining: 5,
            currentProduct: ''
        });
}

export default makeNewActiveLot;