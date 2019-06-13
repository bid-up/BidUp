import Component from '../Component.js';
import MakeBid from './MakeBid.js';
import TimerDisplay from './TimerDisplay.js';
import { activeLotsRef, productsByLotRef, productsRef } from '../services/firebase.js';
import ProductItem from '../auction/ProductItem.js';


class Bidder extends Component {
    render() {
        const dom = this.renderDOM();
        const lot = this.props.lot;
        console.log('here');

        const timerDisplay = new TimerDisplay({ lot, time: '' });
        dom.appendChild(timerDisplay.render());

        const makeBid = new MakeBid({ lot });
        dom.appendChild(makeBid.render());
        
        const productItem = new ProductItem({ product: {} });
        dom.appendChild(productItem.render());

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

        productsByLotRef
            .child(lot.key)
            .on('value', snapshot => {
                const val = snapshot.val();
                const products = val ? Object.values(val) : [];
                const currentProduct = products[0];
                console.log(currentProduct, 'current');
                productsRef
                    .child(currentProduct.key)
                    .on('value', snapshot => {
                        const val = snapshot.val();
                        const product = val;
                        productItem.update({ product });
                        console.log(product, 'product');
                    });
            });


        return dom;
    }

    renderTemplate() {
        return /*html*/`
            <div>
                <p>highest bid</p> <!--dynamic data -->
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;
    }
}

export default Bidder;