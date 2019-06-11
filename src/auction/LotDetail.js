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
                .set({ 
                    uid: auth.currentUser.uid,
                    balance: 500  
                });
        });

        const productList = new ProductList({ products: this.props.products });
        dom.appendChild(productList.render());

        return dom;
    }

    renderTemplate() {
        const lot = this.props.lot;

        return /*html*/`
            <div>
                <h2>${lot.lotName}</h2>
                <!-- product images from add lot component -->
                <button><a href="./bidding.html?key=${lot.key}">Join this Auction Lot</a></button>
            </div>
        `;

    }
}

export default LotDetail;