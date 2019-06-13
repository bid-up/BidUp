import Component from '../Component.js';
import Header from '../shared/Header.js';
import DisplayResults from './DisplayResults.js';
import { activeLotsRef, productsRef } from '../services/firebase.js';

class ResultsApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header({ title: 'Results' });
        main.prepend(header.render());

        const displayResults = new DisplayResults({});

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