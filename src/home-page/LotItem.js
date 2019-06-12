import Component from '../Component.js';

class LotItem extends Component {

    renderTemplate() {
        const lot = this.props.lot;
        return /*html*/`
            <li class="lot-item">
                <a href="./auction.html?key=${lot.key}">${lot.lotName}</a>
            </li>
        `;

    }
}

export default LotItem;