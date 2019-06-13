import Component from '../Component.js';
import MakeBid from './MakeBid.js';
import TimerDisplay from './TimerDisplay.js';
import { auth, activeLotsRef, productsByLotRef, productsRef, usersByLotRef } from '../services/firebase.js';
import ProductItem from '../auction/ProductItem.js';
import BidderBalance from './BidderBalance.js';

class Bidder extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;
        const productItemUl = dom.querySelector('.product-item');

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        const makeBid = new MakeBid({ lot });
        dom.appendChild(makeBid.render());
        
        const productItem = new ProductItem({ product: {} });
        productItemUl.appendChild(productItem.render());

        const bidderBalance = new BidderBalance({ 
            balance: 500
        });

        dom.appendChild(bidderBalance.render());

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
                    if(val.time <= 0) {
                        window.location = `./results.html?key=${lot.key}`;
                    }
                }
            });

        // holding balance = balance - highest bid
        const highestBid = this.props.highestBid || 0;

        // getting balance from db 
        usersByLotRef
            .child(lot.key)
            .child(auth.currentUser.uid)
            .child('balance')
            .on('value', snapshot => {
                const val = snapshot.val();
                const balance = val.balance;
                bidderBalance.update({ balance, holdingBalance: balance - highestBid });
            });

        // get product info for display
        productsByLotRef
            .child(lot.key)
            .on('value', snapshot => {
                const val = snapshot.val();
                const products = val ? Object.values(val) : [];
                const currentProduct = products[0];
    
                productsRef
                    .child(currentProduct.key)
                    .on('value', snapshot => {
                        const val = snapshot.val();
                        const product = val;
                        productItem.update({ product });
                    });
            });
        return dom;
    }

    renderTemplate() {
        const highestBidder = this.props.highestBidder;
        const highestBid = this.props.highestBid;

        const bidderDisplayName = highestBidder ? highestBidder.displayName : 'no bidder';
        const highestBidDisplay = highestBid ? highestBid : 0;

        return /*html*/`
            <div>
                <h2>Bidder Page</h2>
                <p>Highest Bidder: ${bidderDisplayName}</p>
                <p>Highest Bid: ${highestBidDisplay}</p>
                <ul class="product-item"></ul>
            </div>
            
        `;
    }
}

export default Bidder;