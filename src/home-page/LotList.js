import Component from '../Component.js';
import LotItem from './LotItem.js';

class LotList extends Component {
    render() {
        const list = this.renderDOM();
        const lots = this.props.lots;

        lots.forEach(lot => {
            const lotItem = new LotItem({ lot });
            list.appendChild(lotItem.render());
        });

        return list;
    }

    renderTemplate() {
        return /*html*/`
            <ul>LIST</ul>
        `;

    }
}

export default LotList;