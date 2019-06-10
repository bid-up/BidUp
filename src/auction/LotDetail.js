import Component from '../Component.js';

class LotDetail extends Component {
    renderTemplate() {
        const lot = this.props.lot;

        return /*html*/`
            <div>
                <h2>${lot.lotName}</h2>
                <ul>
                <!-- add lot detail here from add lot component-->
                    <li>lot details</li>
                </ul>
                <!-- product images from add lot component -->
                <ul>
                    <li>list item</li>
                </ul>
            </div>
        `;

    }
}

export default LotDetail;