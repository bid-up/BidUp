import Component from '../Component.js';

class NavBar extends Component {
    renderTemplate() {
        return /*html*/ `
            <ul class="nav-bar">
                <li><a href="#home">HOME</a></li>
                <li><a href="#news">MY BIDS</a></li>
                <li><a href="#about">ABOUT</a></li>
            </ul>
        `;
    }
}

export default NavBar;