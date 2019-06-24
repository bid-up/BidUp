import Component from '../Component.js';

class TimerDisplay extends Component {
    renderTemplate() {
        const time = this.props.time;
        const timeDisplay = time > 0 ? time : '';
        return /*html*/`
            <div>
                <p id="seconds"> ${timeDisplay} </p>
            </div>
        `;
    }
}

export default TimerDisplay;