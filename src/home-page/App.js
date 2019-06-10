import Component from '../Component.js';
import Header from '../shared/Header.js';
import AddLot from '../home-page/AddLot.js';

class App extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');
        const header = new Header({ title: 'Bid Up' });
        dom.prepend(header.render());

        const addLot = new AddLot();
        main.appendChild(addLot.render());

        return dom;
    }
    renderTemplate() {
        return /*html*/`
            <div>
                <main>
                Hello
                </main>
            </div>
        `;

    }
}

export default App;