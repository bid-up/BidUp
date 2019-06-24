import Component from '../Component.js';

class ProductItem extends Component {
    renderTemplate() {
        const product = this.props.product;
        // Do you need the <div>?
        // Or could you just use css to style the <h2> and <img>?
        // You could handle the error event in js too :)
        return /*html*/`
            <li class="product-detail">
                <h2>${product.productName}</h2>
                <img src="${product.productURL}" onerror="this.onerror=null;this.src='../assets/no-product-default.png'">
            </li>
        `;

    }
}

export default ProductItem;