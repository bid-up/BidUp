import Component from '../Component.js';
import MakeBid from './MakeBid.js';

class Bidder extends Component {
    render() {
        const dom = this.renderDOM();

        const makeBid = new MakeBid();
        dom.appendChild(makeBid.render());

        return dom;
    }

    renderTemplate() {
        return /*html*/`
            <div>
                <h2>name of item</h2>
                <p>TIMER</p>
                <img src="assets/tomatos.jpg">
                <p>static details</p>
                <p>highest bid</p> <!--dynamic data -->
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;
    }
}

export default Bidder;