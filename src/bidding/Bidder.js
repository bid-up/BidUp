import Component from '../Component.js';
import MakeBid from './MakeBid.js';
import TimerDisplay from './TimerDisplay.js';
import { activeLotsRef } from '../services/firebase.js';

class Bidder extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        const makeBid = new MakeBid({ lot });
        dom.appendChild(makeBid.render());

        // update timer display from database
        activeLotsRef
            .child(lot.key)
            .child('timeRemaining')
            .on('value', snapsnot => {
                const val = snapsnot.val();
                if(!val) {
                    timerDisplay.update({ time: '' });
                } else {
                    timerDisplay.update({ time: val.time });
                }
            });

        return dom;
    }

    renderTemplate() {
        const highestBidder = this.props.highestBidder;
        const bidderDisplayName = highestBidder ? highestBidder.displayName : 'no bidder';

        return /*html*/`
            <div>
                <h2>name of item</h2>
                <img src="assets/tomatos.jpg">
                <p>highest bid</p>
                <p>Highest Bidder: ${bidderDisplayName}</p> <!--dynamic data -->
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;
    }
}

export default Bidder;