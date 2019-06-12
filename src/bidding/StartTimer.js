import Component from '../Component.js';
import resetTimer from './reset-timer.js';
import { activeLotsRef } from '../services/firebase.js';

class StartTimer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');
        const lot = this.props.lot;

        timerButton.addEventListener('click', () => {
            resetTimer(lot.key);

            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .set({ reset: new Date().getTime() });

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