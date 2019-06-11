import Component from '../Component.js';

class LotItem extends Component {

    renderTemplate() {
        const lot = this.props.lot;
        return /*html*/`
        <li>
            <a href="./auction-detail.html?key=${lot.key}">${lot.lotName}</a>
        </li>
        `;

    }
}

export default LotItem;