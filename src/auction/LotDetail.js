import Component from '../Component.js';
import { auth, usersByLotRef } from '../services/firebase.js';
import ProductList from './ProductList.js';

class LotDetail extends Component {
    render() {
        const dom = this.renderDOM();
        const joinButton = dom.querySelector('button');
        const lot = this.props.lot;
        const productListDiv = dom.querySelector('.product-list');

        // function to generate random balance from min to max
        // min and max are in hundreds
        function getRandomBalance(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            const final = Math.floor(Math.random() * (max - min + 1)) + min;
            return final * 100;
        }

        // When user joins, set initial balance and holding balance
        joinButton.addEventListener('click', () => {
            // Generate random balance in range from 100-500
            const randomBalance = getRandomBalance(1, 10);

            // Add balance when user joins lot
            usersByLotRef
                .child(lot.key)
                .child(auth.currentUser.uid)
                .child('balance')
                .set({ 
                    balance: randomBalance,
                });
        });

        // Pass product info as props
        const productList = new ProductList({ products: this.props.products });
        productListDiv.appendChild(productList.render());

        return dom;
    }

    renderTemplate() {
        const lot = this.props.lot;

        return /*html*/`
            <div class="auction-detail">
                <h2>${lot.lotName}</h2>
                <div class="product-list"></div>
                <div class="bid-btn">
                    <button class="btn"><a href="./bidding.html?key=${lot.key}">Join Auction</a></button>
                </div>
            </div>
        `;

    }
}

export default LotDetail;