import Component from '../Component.js';
import Header from '../shared/Header.js';
import Bidder from './Bidder.js';
import Auctioneer from './Auctioneer.js';
import QUERY from '../utils/QUERY.js';
import { auth, lotsRef } from '../services/firebase.js';

class BiddingApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'BiddingApp' });
        main.prepend(header.render());

        const query = QUERY.parse(window.location.search);
        
        lotsRef
            .child(query.key)
            .on('value', snapshot => {
                const lot = snapshot.val();
                const lotOwner = lot.owner;
                if(auth.currentUser.uid === lotOwner) {
                    const auctioneer = new Auctioneer({ lot });
                    main.appendChild(auctioneer.render());
                } else {
                    const bidder = new Bidder({ lot });
                    main.appendChild(bidder.render());
                }
            });

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