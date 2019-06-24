import Component from '../Component.js';
import ProductItem from './ProductItem.js';
import { productsRef } from '../services/firebase.js';

class ProductList extends Component {
    render() {
        const dom = this.renderDOM();
        const products = this.props.products;

        products.forEach(product => {
            productsRef
                .child(product.key)
                .on('value', snapshot => {
                    const val = snapshot.val();
                    const productItem = new ProductItem({ product: val });
                    dom.appendChild(productItem.render());
                });
        });

        return dom;
    }

    renderTemplate() {
        return /*html*/`
            <ul class="product-list-container"></ul>
        `;
    }
}

export default ProductList;