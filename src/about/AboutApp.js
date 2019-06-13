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
                        <div>
                            <h2>Carlos</h2>
                            <img src="assets/about/carlos.png">
                            <ul>
                                <li><a href=""><img src=></a></li>
                                <li><a href=""><img src=></a><li>
                                <li><a href=""><img src=""></a></li>
                            </ul>
                        </div>

                    <div>
                    <h2>Leigh-Ann</h2>
                    <img src="fdaf">
                    <span>
                    <a href=""></a>
                    </span>
                    </div>

                    <div>
                    <h2>Lili</h2>
                    <img src="fdaf">
                    </div>

                    <div>
                    <h2>Susan</h2>
                    <img src="fdaf">
                    </div>

                    <div>
                    <h2>Wes</h2>
                    <img src="fdaf">
                    </div>
                </main>
            </div>
        `;
    }
}

export default AboutApp;