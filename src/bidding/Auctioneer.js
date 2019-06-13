import Component from '../Component.js';
import StartTimer from './StartTimer.js';
import TimerDisplay from './TimerDisplay.js';
import { activeLotsRef, productsByLotRef, productsRef } from '../services/firebase.js';
import ProductItem from '../auction/ProductItem.js';

class Auctioneer extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;

        const productItemUl = dom.querySelector('.product-item');

        const productItem = new ProductItem({ product: {} });
        productItemUl.appendChild(productItem.render());

        const timer = new StartTimer({ lot: this.props.lot });
        dom.appendChild(timer.render());

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        // Get display for timer display
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
        
        // Get product info for display
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

        return /*html*/ `
            <div>
                <h2>Auctioneer Page</h2>
                <ul class="product-item"></ul>
                <p>Highest Bidder: ${bidderDisplayName}</p>
                <p>Highest Bid: ${highestBidDisplay}</p>
            </div>
        `;
    }
}

export default Auctioneer;