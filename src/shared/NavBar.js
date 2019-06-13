import Component from '../Component.js';

class NavBar extends Component {
    renderTemplate() {
        return /*html*/ `
        <div>
            <ul class="nav-bar">
                <li><a href="index.html">HOME</a></li>
                <li><a href="about.html">ABOUT</a></li>
            </ul>
        </div>
        `;
    }
}

export default NavBar;