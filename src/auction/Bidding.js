import Component from '../Component.js';
// import { productsByLotRef } from '../services/firebase.js';
// import ProductList from './ProductList.js';

class Bidding extends Component {
    render() {
        const dom = this.renderDOM();
        // const lot = this.props.lot;
        // const productList = new ProductList();
        // dom.appendChild(productList.render());

        // productsByLotRef
        //     .child(lot.key)
        //     .on('value', snapshot => {
        //         const val = snapshot.val();
        //         const products = val ? Object.values(val) : [];
        //         productList.update(products);
        //     });
        

        return dom;
    }

    renderTemplate() {
        const joined = this.props.joined;

        if(!joined) {
            return '<div></div>';
        }

        return /*html*/`
            <div>
                <h2>name of item</h2>
                <p>TIMER</p>
                <img src="assets/tomatos.jpg">
                <p>static details</p>
                <p>highest bid</p> <!--dynamic data -->
                <div>
                    <button>$10</button>
                    <button>$100</button>
                    <button>Max</button>
                </div>
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;

    }
}

export default Bidding;