import Component from '../Component.js';

class ProductItem extends Component {
    renderTemplate() {
        const product = this.props.product;
        return /*html*/`
            <li class="product-detail">
                <h2>${product.productName}</h2>
                <img src="${product.productURL}" 
                onerror="this.onerror=null;this.src='../assets/no-product-default.png'">
            </li>
        `;

    }
}

export default ProductItem;