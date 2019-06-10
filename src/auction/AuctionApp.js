import QUERY from '../utils/QUERY.js';
import { lotsRef } from '../services/firebase.js';

import Component from '../Component.js';
import Header from '../shared/Header.js';
import LotDetail from './LotDetail.js';

class AuctionApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Auction Lot' });
        main.prepend(header.render());

        const lotDetail = new LotDetail({ lot: {} });
        main.appendChild(lotDetail.render());
        
        const searchParams = QUERY.parse(window.location.search);
        const lotKey = searchParams.key;
        
        lotsRef 
            .child(lotKey)
            .on('value', snapshot => {
                const val = snapshot.val();
                lotDetail.update({ lot: val });
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