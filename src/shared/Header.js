import Component from '../Component.js';
import Profile from './Profile.js';
import { auth } from '../services/firebase.js';
import NavBar from './NavBar.js';

class Header extends Component {
    render() {
        const dom = this.renderDOM();
        const navProfile = dom.querySelector('.nav-profile');

        const navBar = new NavBar();
        navProfile.appendChild(navBar.render());

        const profile = new Profile();
        navProfile.appendChild(profile.render());

        auth.onAuthStateChanged(user => {
            profile.update({ user });
        });

        return dom;
    }
    renderTemplate() {
        // const title = this.props.title || document.title;
        
        return /*html*/`
            <header>
                <div class="logo">
                    <a href="./"><img src="../../assets/bidup-logo3.png"></a>
                </div>
                <div class="nav-profile"></div>
            </header>
        `;

    }
}

export default Header;