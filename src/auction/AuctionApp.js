import QUERY from '../utils/QUERY.js';
import { lotsRef, productsByLotRef } from '../services/firebase.js';

import Component from '../Component.js';
import Header from '../shared/Header.js';
import LotDetail from './LotDetail.js';

class AuctionApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Auction Lot' });
        main.prepend(header.render());

        const lotDetail = new LotDetail({ 
            lot: {},
            products: []
        });

        main.appendChild(lotDetail.render());
        
        // Grab lot key from URL
        const searchParams = QUERY.parse(window.location.search);
        const lotKey = searchParams.key;

        // Look up lot info and pass as props
        lotsRef 
            .child(lotKey)
            .on('value', snapshot => {
                const lot = snapshot.val();
                lotDetail.update({ lot });
            });

        // Get products in lot and pass as props
        productsByLotRef
            .child(lotKey)
            .on('value', snapshot => {
                const val = snapshot.val();
                const products = val ? Object.values(val) : [];
                lotDetail.update({ products });
            });
        
        return dom;
    }
    renderTemplate() {
        return /*html*/`
            <div>
                <main></main>
            </div>
            
        `;

    }
}

export default AuctionApp;