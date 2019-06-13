import Component from '../Component.js';

class DisplayResults extends Component {
    renderTemplate() {
        const highestBid = this.props.highestBid;
        const highestBidder = this.props.highestBidder;
        const displayName = highestBidder.displayName;

        return /*html*/ `
            <div>
                <h2>FINAL RESULT</h2>
                <h3>WINNER: ${displayName}</h3>
                <h3>GOING PRICE: ${highestBid}</h3>
                <p>Time to pay up!</p>
            </div>
        `;
    }
}

export default DisplayResults;