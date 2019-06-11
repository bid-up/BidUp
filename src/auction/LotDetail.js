import Component from '../Component.js';
import { auth, usersByLotRef } from '../services/firebase.js';
import ProductList from './ProductList.js';

class LotDetail extends Component {
    render() {
        const dom = this.renderDOM();
        const button = dom.querySelector('button');
        const lot = this.props.lot;

        if(!this.props.joined) {
            button.addEventListener('click', () => {
                usersByLotRef
                    .child(lot.key)
                    .child(auth.currentUser.uid)
                    .set({ 
                        uid: auth.currentUser.uid,
                        balance: 500  
                    });
            });
        }

        const productList = new ProductList({ products: this.props.products });
        dom.appendChild(productList.render());

        return dom;
    }

    renderTemplate() {
        const lot = this.props.lot;

        if(this.props.joined) {
            return '<div></div>';
        }

        return /*html*/`
            <div>
                <h2>${lot.lotName}</h2>
                <!-- product images from add lot component -->
                <button>Join this Auction Lot</button>
            </div>
        `;

    }
}

export default LotDetail;