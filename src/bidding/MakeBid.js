import Component from '../Component.js';
import { activeLotsRef, usersByLotRef, auth } from '../services/firebase.js';

class MakeBid extends Component {
    render() {
        const dom = this.renderDOM();
        const bidTen = dom.querySelector('.bid-ten');
        const bidFifty = dom.querySelector('.bid-fifty');

        const lot = this.props.lot;
        
        // this happens when a user has enough money to bid
        function successfulBid(bidAmount) {
            // decrease holding balance by bid amount
            // get holding balance
            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('holdingBalance')
                .once('value', snapshot => {
                    const val = snapshot.val();
                    const holdingBalance = val.holdingBalance;

                    // update holding balance 
                    const updatedHoldingBalance = holdingBalance - bidAmount;
                    usersByLotRef
                        .child(lot.key)
                        .child(auth.currentUser.uid)
                        .child('holdingBalance')
                        .set({
                            holdingBalance: updatedHoldingBalance
                        });
                });

            // set highest bidder and increase highest bid in db
            // get highest bid
            let highestBid;
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .once('value', snapshot => {
                    const value = snapshot.val();
                    value 
                        ? highestBid = value.highestBid 
                        : highestBid = 0;
                    console.log('current highestBid', highestBid);

                    // set highest bidder (person who just bid)
                    // set highest bid 
                    const newHighestBid = highestBid + bidAmount;
                    console.log('newHighestBId', newHighestBid);
                    activeLotsRef
                        .child(lot.key)
                        .child('resetTimer')
                        .set({
                            highestBidder: auth.currentUser.uid,
                            highestBid: newHighestBid  //increase by bidAmount
                        });
                });
        }

        // Disable and enable buttons to add delay after click
        // Detect bid click of anyone
        activeLotsRef
            .child(lot.key)
            .child('resetTimer')
            .on('value', snapshot => {
                const value = snapshot.val();
                if(value) {
                    if(value.highestBidder !== auth.currentUser.uid) {
                        bidTen.disabled = true;
                        bidFifty.disabled = true;
                        setTimeout(() => {
                            bidTen.disabled = false;
                            bidFifty.disabled = false;
                        }, 1000);
                    } else {
                        bidTen.disabled = true;
                        bidFifty.disabled = true;
                    }
                }
            });

        bidTen.addEventListener('click', () => {
            const bidAmount = 10;

            // check if user has enough money to bid
            // if highest bid plus bid amount is not higher than balance
            
            // get highest bid
            let highestBid;
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .once('value', snapshot => {
                    const value = snapshot.val();
                    value 
                        ? highestBid = value.highestBid 
                        : highestBid = 0;
            
                    // get balance
                    usersByLotRef
                        .child(lot.key)
                        .child(auth.currentUser.uid)
                        .child('balance')
                        .once('value', snapshot => {
                            const val = snapshot.val();
                            const balance = val.balance;

                            // check if user has enough money
                            if(highestBid + 10 <= balance) {
                                successfulBid(bidAmount);
                            } else {
                                bidTen.disabled = true;
                                bidFifty.disabled = true;
                            }
                        });
                });

            // // get holding balance (for display)
            // usersByLotRef
            //     .child(lot.key)
            //     .child(auth.currentUser.uid)
            //     .child('holdingBalance')
            //     .once('value', snapshot => {
            //         const val = snapshot.val();
                    
            //         if(val.holdingBalance >= bidAmount) {
            //             successfulBid(bidAmount);
            //         } else {
            //             bidTen.disabled = true;
            //             bidFifty.disabled = true;
            //         }
            //     });
        });

        bidFifty.addEventListener('click', () => {
            const bidAmount = 50;

            // check if user has enough money to bid
            // if highest bid plus bid amount is not higher than balance
            
            // get highest bid
            let highestBid;
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .once('value', snapshot => {
                    const value = snapshot.val();
                    value 
                        ? highestBid = value.highestBid 
                        : highestBid = 0;
            
                    // get balance
                    usersByLotRef
                        .child(lot.key)
                        .child(auth.currentUser.uid)
                        .child('balance')
                        .once('value', snapshot => {
                            const val = snapshot.val();
                            const balance = val.balance;

                            // check if user has enough money
                            if(highestBid + 50 <= balance) {
                                successfulBid(bidAmount, highestBid);
                            } else if(highestBid + 10 <= balance) {
                                bidFifty.disabled = true;
                            } else {
                                bidTen.disabled = true;
                                bidFifty.disabled = true;
                            }
                        });
                });

            // // get holding balance (for display)
            // usersByLotRef
            //     .child(lot.key)
            //     .child(auth.currentUser.uid)
            //     .child('holdingBalance')
            //     .once('value', snapshot => {
            //         const val = snapshot.val();
                    
            //         if(val.holdingBalance >= bidAmount) {
            //             successfulBid(bidAmount, val);
            //         } else {
            //             bidTen.disabled = true;
            //             bidFifty.disabled = true;
            //         }
            //     });
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