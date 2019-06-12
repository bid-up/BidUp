import Component from '../Component.js';
import Header from '../shared/Header.js';


class AboutApp extends Component {
    render() {
        const dom = this.renderDOM();
        const main = dom.querySelector('main');

        const header = new Header();
        main.prepend(header.render());


        return dom;
    }
    renderTemplate() {
        return /*html*/ `
            <div>
                <main>
                    <h1>About The Team</h1>
                    
                </main>
            </div>
        `;
    }
}

export default AboutApp;