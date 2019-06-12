import Component from '../Component.js';
import Header from '../shared/Header.js';
import Bidder from './Bidder.js';
import Auctioneer from './Auctioneer.js';
import QUERY from '../utils/QUERY.js';
import { auth, lotsRef, activeLotsRef, usersRef } from '../services/firebase.js';

class BiddingApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'BiddingApp' });
        main.prepend(header.render());

        const query = QUERY.parse(window.location.search);
        
        // render auctioneer or bidder depending on lot creator
        lotsRef
            .child(query.key)
            .on('value', snapshot => {
                const lot = snapshot.val();
                const lotOwner = lot.owner;
                if(auth.currentUser.uid === lotOwner) {
                    const auctioneer = new Auctioneer({ lot });
                    main.appendChild(auctioneer.render());

                    // update highest bidder
                    activeLotsRef
                        .child(query.key)
                        .child('resetTimer')
                        .on('value', snapshot => {
                            const value = snapshot.val();
                            const highestBidderUid = value.highestBidder;
                            const highestBid = value.highestBid;

                            // Get more info on highestBidder
                            usersRef
                                .child(highestBidderUid)
                                .on('value', snapshot => {
                                    const highestBidder = snapshot.val();
                                    auctioneer.update({ highestBidder, highestBid });
                                });
                        });

                } else {
                    const bidder = new Bidder({ lot });
                    main.appendChild(bidder.render());
                    // update highest bidder
                    activeLotsRef
                        .child(query.key)
                        .child('resetTimer')
                        .on('value', snapshot => {
                            const value = snapshot.val();
                            const highestBidderUid = value.highestBidder;
                            const highestBid = value.highestBid;

                            usersRef
                                .child(highestBidderUid)
                                .on('value', snapshot => {
                                    const highestBidder = snapshot.val();
                                    bidder.update({ highestBidder, highestBid });
                                });
                        });
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