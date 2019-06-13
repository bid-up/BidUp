import Component from '../Component.js';

class BidderBalance extends Component {
    renderTemplate() {
        const balance = this.props.balance;
        const holdingBalance = this.props.holdingBalance;

        return /*html*/ `
        <div>
            <p>Your Balance: ${balance}</p>
            <p>Remaining Bet Balance: ${holdingBalance}</p>
        </div>
        `;
    }
}

export default BidderBalance;