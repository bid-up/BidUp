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
            const bidAmount = 10;

            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('holdingBalance')
                .once('value', snapshot => {
                    const val = snapshot.val();
                    if(val.holdingBalance >= bidAmount) {
                        // update reset timer in db
                        activeLotsRef
                            .child(lot.key)
                            .child('resetTimer')
                            .set({
                                reset: new Date().getTime() // change to UID
                            });
                        // change holding balance 
                        const updatedHoldingBalance = val.holdingBalance - bidAmount;
                        usersByLotRef
                            .child(lot.key)
                            .child(auth.currentUser.uid)
                            .child('holdingBalance')
                            .set({
                                holdingBalance: updatedHoldingBalance
                            });
                        // get highest bid
                        let highestBid;
                        usersByLotRef
                            .child(lot.key)
                            .child(auth.currentUser.uid)
                            .child('highestBid')
                            .once('value', snapshot => {
                                const value = snapshot.val();
                                value 
                                    ? highestBid = value.highestBid 
                                    : highestBid = 0
                                            
                                // set highest bid
                                usersByLotRef
                                    .child(lot.key)
                                    .child(auth.currentUser.uid)
                                    .child('highestBid')
                                    .set({
                                        highestBid: highestBid + bidAmount
                                    });
                            });
                    }    
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