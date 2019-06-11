import Component from '../Component.js';
import StartTimer from './StartTimer.js';

class Auctioneer extends Component {
    render() {
        const dom = this.renderDOM();

        const timer = new StartTimer({ lot: this.props.lot });
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