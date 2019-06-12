import Component from '../Component.js';
import resetTimer from './reset-timer.js';
import { auth, activeLotsRef } from '../services/firebase.js';

class StartTimer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');
        const lot = this.props.lot;

        timerButton.addEventListener('click', () => {
            resetTimer(lot.key);

            // Create active lot
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .set({ 
                    highestBidder: auth.currentUser.uid,
                    highestBid: 0
                });

            // Reset timer when bid is placed
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .on('value', snapshot => {
                    snapshot.val();
                    resetTimer(lot.key);
                });

            timerButton.classList.add('hidden');
        });

        return dom; 
    }

    renderTemplate() {
        return `
        <div>
            <button>Start Timer</button>
        </div>
        `;
    }
}

export default StartTimer;