import { activeLotsRef } from '../services/firebase.js';

function isLotActive(lotKey) {
    activeLotsRef
        .on('value', snapshot => {
            const val = snapshot.val();
            const lots = val ? Object.keys(val) : [];
            console.log(lots.includes(lotKey));
            return lots.includes(lotKey);
        });
}

export default isLotActive;  