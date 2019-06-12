import Component from '../Component.js';
import resetTimer from './reset-timer.js';
import { activeLotsRef, usersByLotRef, auth } from '../services/firebase.js';

class MakeBid extends Component {
    render() {
        const dom = this.renderDOM();
        const bidTen = dom.querySelector('.bid-ten');
        const bidFifty = dom.querySelector('.bid-fifty');

        const lot = this.props.lot;
        
        function successfulBid(bidAmount, val) {
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
                        : highestBid = 0;
                                
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

        activeLotsRef
            .child(lot.key)
            .child('resetTimer')
            .on('value', snapshot => {
                const value = snapshot.val();
                console.log(value)
                if(value) {
                    bidTen.disabled = true;
                    bidFifty.disabled = true;
                    setTimeout(() => {
                        bidTen.disabled = false;
                        bidFifty.disabled = false;
                    }, 1000);
                }
            });

        bidTen.addEventListener('click', () => {
            const bidAmount = 10;
            // get holding balance
            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('holdingBalance')
                .once('value', snapshot => {
                    const val = snapshot.val();
                    // check if user has enough money to bid
                    if(val.holdingBalance >= bidAmount) {
                        successfulBid(bidAmount, val);
                    } else {
                        bidTen.disabled = true;
                        bidFifty.disabled = true;
                    }
                });
        });

        bidFifty.addEventListener('click', () => {
            const bidAmount = 50;
            // get holding balance
            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('holdingBalance')
                .once('value', snapshot => {
                    const val = snapshot.val();
                    // check if user has enough money to bid
                    if(val.holdingBalance >= bidAmount) {
                        successfulBid(bidAmount, val);
                    }    
                });
        });

        return dom;
    }
    
    renderTemplate() {

        return /*html*/ `
            <div>
                <button disabled class="bid-ten">10</button>
                <button disabled class="bid-fifty">50</button>
            </div>
        `;
    }
}

export default MakeBid;