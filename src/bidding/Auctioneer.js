import Component from '../Component.js';
import Timer from './Timer.js';

class Auctioneer extends Component {
    render() {
        const dom = this.renderDOM();
        
        const timer = new Timer();
        dom.appendChild(timer.render());

        return dom;
    }
    renderTemplate() {
        return /*html*/ `
            <div>Auctioneer</div>
        `;
    }
}

export default Auctioneer;