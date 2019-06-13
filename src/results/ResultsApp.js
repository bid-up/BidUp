import Component from '../Component.js';
import Header from '../shared/Header.js';
import DisplayResults from './DisplayResults.js';
import { activeLotsRef, usersRef } from '../services/firebase.js';
import QUERY from '../utils/QUERY.js';

class ResultsApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Results' });
        main.prepend(header.render());

        const displayResults = new DisplayResults({ highestBid: '', highestBidder: '' });
        main.appendChild(displayResults.render());

        const query = QUERY.parse(window.location.search);
        const lotKey = query.key;

        activeLotsRef
            .child(lotKey)
            .child('resetTimer')
            .on('value', snapsnot => {
                const val = snapsnot.val();
                const highestBid = val.highestBid;
                // This is a string of the uid
                const highestBidder = val.highestBidder;

                // Get User Info
                usersRef
                    .child(highestBidder)
                    .on('value', snapsnot => {
                        const val = snapsnot.val();
                        const user = val;
                        displayResults.update({ highestBid, highestBidder: user });
                    });
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

export default ResultsApp;