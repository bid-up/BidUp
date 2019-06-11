import Component from '../Component.js';

class Bidding extends Component {
    renderTemplate() {
        const joined = this.props.joined;

        if(!joined) {
            return '<div></div>';
        }

        return /*html*/`
            <div>
                <h2>name of item</h2>
                <p>TIMER</p>
                <img src="assets/tomatos.jpg">
                <p>static details</p>
                <p>highest bid</p> <!--dynamic data -->
                <div>
                    <button>$10</button>
                    <button>$100</button>
                    <button>Max</button>
                </div>
                <p>Balance: </p>
                <!-- Activity Feed List Component -->
            </div>
            
        `;

    }
}

export default Bidding;