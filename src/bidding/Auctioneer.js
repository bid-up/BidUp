import Component from '../Component.js';
import StartTimer from './StartTimer.js';
import TimerDisplay from './TimerDisplay.js';
import { activeLotsRef } from '../services/firebase.js';

class Auctioneer extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;

        const timer = new StartTimer({ lot: this.props.lot });
        dom.appendChild(timer.render());

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        activeLotsRef
            .child(lot.key)
            .child('timeRemaining')
            .on('value', snapsnot => {
                const val = snapsnot.val();
                if(!val.time) {
                    timerDisplay.update({ time: '' });
                } else {
                    timerDisplay.update({ time: val.time });
                }
            });

        return dom;
    }
    
    renderTemplate() {
        return /*html*/ `
            <div>Auctioneer</div>
        `;
    }
}

export default Auctioneer;