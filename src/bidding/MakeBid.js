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

            // set highest bidder and increase highest bid in db
            // get highest bid
            
            // This is too broadly scoped, move into value handler
            // let highestBid;
            activeLotsRef
                .child(lot.key)
                .child('resetTimer')
                .once('value', snapshot => {
                    const value = snapshot.val();
                    const highestBid = value ? value.highestBid : 0;

                    // set highest bidder (person who just bid)
                    // set highest bid 
                    const newHighestBid = highestBid + bidAmount;
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
                                alert('Stop spending money you do not have!');                            
                            }
                        });
                });
        });

        
        bidFifty.addEventListener('click', () => {
            const bidAmount = 50;

            // DON'T CUT AND PASTE CODE LIKE THIS
            // Only difference is the bidAmount and some of the button logic
            // Try and consolidate into functions

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
                                alert('Stop spending money you do not have!');
                            } else {
                                bidTen.disabled = true;
                                bidFifty.disabled = true;
                                alert('Stop spending money you do not have!');
                            }
                        });
                });
        });

        return dom;
    }
    
    renderTemplate() {

        return /*html*/ `
            <div class="bidding-buttons">
                <button disabled class="bid-ten"><span>$10</span></button>
                <button disabled class="bid-fifty"><span>$50</span></button>
            </div>
        `;
    }
}

export default MakeBid;