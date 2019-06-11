import Component from '../Component.js';
import resetTimer from './reset-timer.js';

class StartTimer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');

        timerButton.addEventListener('click', () => {
            resetTimer();
            timerButton.classList.add('hidden');
        });

        return dom; 
    }

    renderTemplate() {
        return `
        <div>
            <button>Start Timer</button>
        </div>
        `;
    }
}

export default StartTimer;