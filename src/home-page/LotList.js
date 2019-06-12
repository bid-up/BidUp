import Component from '../Component.js';
import LotItem from './LotItem.js';

class LotList extends Component {
    render() {
        const dom = this.renderDOM();
        const list = dom.querySelector('ul');
        const lots = this.props.lots;

        lots.forEach(lot => {
            const lotItem = new LotItem({ lot });
            list.prepend(lotItem.render());
        });

        return dom;
    }

    renderTemplate() {
        return /*html*/`
            <div class="lot-list-container">
                <ul></ul>
            </div>
        `;

    }
}

export default LotList;