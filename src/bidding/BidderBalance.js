import Component from '../Component.js';

class BidderBalance extends Component {
    renderTemplate() {
        const balance = this.props.balance;

        return /*html*/ `
        <div>
            <p>Your Total Balance: ${balance}</p>
        </div>
        `;
    }
}

export default BidderBalance;