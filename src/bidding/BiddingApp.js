import Component from '../Component.js';
import Bidder from './Bidder.js';
import Auctioneer from './Auctioneer.js';

class BiddingApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const bidder = new Bidder();
        main.appendChild(bidder.render());

        const auctioneer = new Auctioneer();
        main.appendChild(auctioneer.render());

        return dom;
    }
    renderTemplate() {
        return /*html*/ `
            <div>
                <main>
                </main>
            </div>
        `;
    }
}

export default BiddingApp;