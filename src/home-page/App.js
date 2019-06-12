import Component from '../Component.js';
import Header from '../shared/Header.js';
import AddLot from './AddLot.js';
import LotList from './LotList.js';
import { lotsRef } from '../services/firebase.js';

class App extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Bid Up' });
        dom.prepend(header.render());
        
        const addLot = new AddLot();
        main.appendChild(addLot.render());

        const lotList = new LotList({ lots: [] });
        main.appendChild(lotList.render());

        lotsRef
            .on('value', snapshot => {
                const val = snapshot.val();
                const lots = val ? Object.values(val) : [];
                lotList.update({ lots });
            });


        return dom;
    }
    renderTemplate() {
        return /*html*/`
            <div>
                <main>
                </main>
            </div>
        `;

    }
}

export default App;