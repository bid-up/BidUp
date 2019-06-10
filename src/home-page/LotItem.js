import Component from '../Component.js';

class LotItem extends Component {
    renderTemplate() {
        const lot = this.props.lot;
        return /*html*/`
        <li>
            <a>${lot.lotName}</a>
        </li>
        `;

    }
}

export default LotItem;