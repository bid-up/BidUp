import Component from '../Component.js';
import resetTimer from './reset-timer.js';
import { activeLotsRef } from '../services/firebase.js';

class StartTimer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');
        const lot = this.props.lot;

        timerButton.addEventListener('click', () => {

            // Add lot to activeLots if not in activeLots already
            activeLotsRef
                .on('value', snapshot => {
                    const val = snapshot.val();
                    const lots = val ? Object.keys(val) : [];
                    if(!lots.includes(lot.key)) {
                        activeLotsRef  
                            .child(lot.key)
                            .set({
                                highestBid: 0,
                                highestBidder: '',
                                timeRemaining: 5,
                                currentProduct: ''
                            });
                    }
                });

            resetTimer(lot.key);
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