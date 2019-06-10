import Component from '../Component.js';

class Header extends Component {
    renderTemplate() {
        const title = this.props.title || document.title;
        return /*html*/`
            <header>
                <h1>${title}</h1>
            </header>
        `;

    }
}

export default Header;