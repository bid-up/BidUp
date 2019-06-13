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
                    <h1 class="about-title">About The Team</h1>
                    <div class="about-container">
                            <div class="about-person">
                                <h2>Carlos</h2>
                                <img class="avatar" src="assets/about/carlos.png">
                                <ul>
                                    <li><a href="https://github.com/carlosus"><img src="assets/about/github.png"></a></li>
                                    <li><a href="https://www.linkedin.com/in/carlosussantiago/"><img src="assets/about/linkedin.png"></a></li>
                                    <li><img src="assets/about/twitter.png"></li>
                                </ul>
                            </div>
                            <div class="about-person">
                            <h2>Leigh-Ann</h2>
                            <img class="avatar" src="assets/about/leigh-ann.jpeg">
                                <ul>
                                    <li><a href="https://github.com/lacrivella"><img src="assets/about/github.png"></a></li>
                                    <li><a href="https://www.linkedin.com/in/lacrivella/"><img src="assets/about/linkedin.png"></a></li>
                                    <li><a href="https://twitter.com/lacrivella"><img src="assets/about/twitter.png"></a></li>
                                </ul>
                            </div>
                            <div class="about-person">
                            <h2>Lili</h2>
                            <img class="avatar" src="assets/about/lili.jpeg">
                                <ul>
                                    <li><a href="https://github.com/liliboxer"><img src="assets/about/github.png"></a></li>
                                    <li><a href="https://www.linkedin.com/in/lili-boxer/"><img src="assets/about/linkedin.png"></a></li>
                                    <li><a href="https://twitter.com/liliboxer"><img src="assets/about/twitter.png"></a></li>
                                </ul>
                            </div>
                            <div class="about-person">
                            <h2>Susan</h2>
                            <img class="avatar" src="assets/about/susan.jpeg">
                                <ul>
                                    <li><a href="https://github.com/sepuckett86"><img src="assets/about/github.png"></a></li>
                                    <li><a href="https://www.linkedin.com/in/susanpuckett/"><img src="assets/about/linkedin.png"></a></li>
                                    <li><a href="https://twitter.com/SusanPu29823252"><img src="assets/about/twitter.png"></a></li>
                                </ul>
                            </div>
                            <div class="about-person">
                            <h2>Wes</h2>
                            <img class="avatar" src="assets/about/wes.jpeg">
                                <ul>
                                    <li><a href="https://github.com/codingclueless"><img src="assets/about/github.png"></a></li>
                                    <li><a href="https://www.linkedin.com/in/wes-griffin-319b7a184/"><img src="assets/about/linkedin.png"></a></li>
                                    <li><img src="assets/about/twitter.png"></li>
                                </ul>
                            </div>
                    </div>
                </main>
            </div>
        `;
    }
}

export default AboutApp;