import Component from '../Component.js';
import { auth } from '../services/firebase.js'; 

class Profile extends Component {
    render() {
        const dom = this.renderDOM();

        if(this.props.user) {
            const button = dom.querySelector('button');
            button.addEventListener('click', () => {
                auth.signOut();
            });
        }

        return dom;
    }
    renderTemplate() {
        const user = this.props.user;

        if(!user) {
            return '<div></div>';
        }
        const avatar = user.photoURL || './assets/dabbing.png';

        return /*html*/`
            <div class="profile">
                <img src="${avatar}">
                <p>${user.displayName}</p>
                <button>Sign Out</button>
            </div>
        `;

    }
}

export default Profile;