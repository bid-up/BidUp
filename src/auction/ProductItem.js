import Component from '../Component.js';

class ProductItem extends Component {
    renderTemplate() {
        const product = this.props.product;
        return /*html*/`
            <li>
                <h2>${product.productName}</h2>
                <img src="${product.productURL}">
            </li>
        `;

    }
}

export default ProductItem;