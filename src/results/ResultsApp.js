import Component from '../Component.js';
import Header from '../shared/Header.js';
import { activeLotsRef, productsRef } from '../services/firebase.js';

class ResultsApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Results' });
        main.prepend(header.render());

        return dom;
    }
    renderTemplate() {
        return /*html*/ `
            <div>
                <main>
                    <h2>PRODUCT NAME</h2>
                    <img src="assets/tomatos.jpg">
                    <h3>HIGHEST BIDDER</h3>
                    <h2>PRICE AMOUNT</h2>
                </main>
            </div>
        `;
    }
}

export default ResultsApp;