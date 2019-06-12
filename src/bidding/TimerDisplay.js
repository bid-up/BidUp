import Component from '../Component.js';

class TimerDisplay extends Component {
    render() {
        const dom = this.renderDOM();

        return dom; 
    }

    renderTemplate() {
        const time = this.props.time;
        const timeDisplay = time > 0 ? time : 'Time is up!';
        return `
            <div>
                <p id="seconds"> ${timeDisplay} </p>
            </div>
        `;
    }
}

export default TimerDisplay;