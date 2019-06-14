import Component from '../Component.js';

class ProductItem extends Component {
    renderTemplate() {
        const product = this.props.product;
        return /*html*/`
            <div>
            <li class="product-detail">
                <div><h2>${product.productName}</h2></div>
                <div><img src="${product.productURL}"
                onerror="this.onerror=null;this.src='../assets/no-product-default.png'"></div>
            </li>
            </div>
        `;

    }
}

export default ProductItem;