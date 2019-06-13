import Component from '../Component.js';

class DisplayResults extends Component {
    renderTemplate() {
        return /*html*/ `
            <div>
                <h2>PRODUCT NAME</h2>
                <img src="assets/tomatos.jpg">
                <h3>HIGHEST BIDDER</h3>
                <h2>PRICE AMOUNT</h2>
            </div>
        `;
    }
}

export default DisplayResults;