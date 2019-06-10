import QUERY from '../utils/QUERY.js';
import { auth, lotsRef, usersByLotRef } from '../services/firebase.js';

import Component from '../Component.js';
import Header from '../shared/Header.js';
import LotDetail from './LotDetail.js';
import Bidding from './Bidding.js';

class AuctionApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Auction Lot' });
        main.prepend(header.render());

        const lotDetail = new LotDetail({ 
            lot: {},
            joined: false
        
        });

        main.appendChild(lotDetail.render());

        const bidding = new Bidding({ joined: false });
        main.appendChild(bidding.render());
        
        const searchParams = QUERY.parse(window.location.search);
        const lotKey = searchParams.key;
        
        lotsRef 
            .child(lotKey)
            .on('value', snapshot => {
                const val = snapshot.val();
                lotDetail.update({ lot: val });
            });

        usersByLotRef
            .child(lotKey)
            .on('value', snapshot => {
                const val = snapshot.val();
                const users = val ? Object.values(val) : [];
                users.forEach(user => {
                    if(user.uid === auth.currentUser.uid) {
                        lotDetail.update({ joined: true });
                        bidding.update({ joined: true });
                    }
                });
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