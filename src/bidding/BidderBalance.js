import Component from '../Component.js';

class BidderBalance extends Component {
    renderTemplate() {
        const balance = this.props.balance;
        const holdingBalance = this.props.holdingBalance;

        return /*html*/ `
        <div>
            <p>Available Betting Funds: ${holdingBalance}</p>
            <p>Your Total Balance: ${balance}</p>
        </div>
        `;
    }
}

export default BidderBalance;