import Component from '../Component.js';
import MakeBid from './MakeBid.js';
import TimerDisplay from './TimerDisplay.js';
import { activeLotsRef, productsByLotRef, productsRef } from '../services/firebase.js';
import ProductItem from '../auction/ProductItem.js';


class Bidder extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        const makeBid = new MakeBid({ lot });
        dom.appendChild(makeBid.render());
        
        const productItem = new ProductItem({ product: {} });
        dom.appendChild(productItem.render());

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
                        window.location = './results.html';
                    }
                }
            });


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
                <p>Highest Bidder: ${bidderDisplayName}</p>
                <p>Highest Bid: ${highestBidDisplay}</p>
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;
    }
}

export default Bidder;