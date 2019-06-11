import Component from '../Component.js';

class Bidder extends Component {
    renderTemplate() {
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

export default Bidder;