import Component from '../Component.js';

class TimerDisplay extends Component {
    render() {
        const dom = this.renderDOM();

        return dom; 
    }

    renderTemplate() {
        const time = this.props.time;
        return `
            <div>
                <p id="seconds"> ${time} </p>
            </div>
        `;
    }
}

export default TimerDisplay;