import Component from '../Component.js';

class MakeBid extends Component {
    renderTemplate() {
        return /*html*/ `
            <div>
                <button>10</button>
                <button>100</button>
                <button>MAX</button>
            </div>
        `;
    }
}

export default MakeBid;