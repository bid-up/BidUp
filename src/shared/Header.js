import Component from '../Component.js';
import Profile from './Profile.js';
import { auth } from '../services/firebase.js';
import NavBar from './NavBar.js';

class Header extends Component {
    render() {
        const dom = this.renderDOM();

        const navBar = new NavBar();
        dom.appendChild(navBar.render());

        const profile = new Profile();
        dom.appendChild(profile.render());

        auth.onAuthStateChanged(user => {
            profile.update({ user });
        });

        return dom;
    }
    renderTemplate() {
        // const title = this.props.title || document.title;
        
        return /*html*/`
            <header>
                <img id="logo" src="../../assets/bidup-logo3.png">
            </header>
        `;

    }
}

export default Header;