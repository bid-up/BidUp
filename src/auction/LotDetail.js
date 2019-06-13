import Component from '../Component.js';
import { auth, usersByLotRef } from '../services/firebase.js';
import ProductList from './ProductList.js';

class LotDetail extends Component {
    render() {
        const dom = this.renderDOM();
        const button = dom.querySelector('button');
        const lot = this.props.lot;

        button.addEventListener('click', () => {
            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('balance')
                .set({ 
                    balance: 500,
                });

            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('holdingBalance')
                .set({ 
                    holdingBalance: 500
                });
        });

        const productList = new ProductList({ products: this.props.products });
        dom.appendChild(productList.render());

        return dom;
    }

    renderTemplate() {
        const lot = this.props.lot;

        return /*html*/`
            <div class="auction-detail">
                <h2>${lot.lotName}</h2>
                <!-- product images from add lot component -->
                <div>
                    <button class="btn"><a href="./bidding.html?key=${lot.key}">Join Auction</a></button>
                </div>
            </div>
        `;

    }
}

export default LotDetail;