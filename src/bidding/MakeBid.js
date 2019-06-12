import Component from '../Component.js';
import resetTimer from './reset-timer.js';
import { activeLotsRef, usersByLotRef, auth } from '../services/firebase.js';

class MakeBid extends Component {
    render() {
        const dom = this.renderDOM();
        const bidTen = dom.querySelector('.bid-ten');
        const bidFifty = dom.querySelector('.bid-fifty');

        const lot = this.props.lot;
        
        bidTen.addEventListener('click', () => {
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .set({
                    reset: new Date().getTime()
                });
        });


        return dom;
    }
    renderTemplate() {
        const isDisabled = this.props.isDisabled;

        if(isDisabled) {
            return /*html*/ `
            <div>
                <button class="bid-ten" disabled>10</button>
                <button class="bid-fifty" disabled>50</button>
            </div>
            `;
        }

        return /*html*/ `
            <div>
                <button class="bid-ten">10</button>
                <button class="bid-fifty">50</button>
            </div>
        `;
    }
}

export default MakeBid;