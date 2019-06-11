import Component from '../Component.js';

class Timer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');

        timerButton.addEventListener('click', () => {
            resetTimer();
            timerButton.classList.add('hidden');
        });

        function resetTimer() {
            const startDate = new Date().getTime();
            const endDate = startDate + 5000;

            const deadline = new Date(endDate).getTime();
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const timeRemaining = deadline - now;
                const seconds = Math.ceil(timeRemaining % (1000 * 60) / 1000);
                dom.querySelector('#seconds').innerHTML = (seconds);
                if(timeRemaining < 0) {
                    clearInterval(interval);
                    dom.querySelector('#seconds').innerHTML = 'TIME UP';
                }
            });
        }
        return dom; 
    }

    renderTemplate() {
        return `
        <div>
            <button>Start Timer</button>
            <p id="seconds"> </p>
        </div>
        `;
    }
}

export default Timer;