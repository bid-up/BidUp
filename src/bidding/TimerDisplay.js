import Component from '../Component.js';

class TimerDisplay extends Component {
    render() {
        const dom = this.renderDOM();

        return dom; 
    }

    renderTemplate() {
        return `
            <div>
                <p id="seconds"> </p>
            </div>
        `;
    }
}

export default TimerDisplay;