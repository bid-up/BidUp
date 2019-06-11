import Component from '../Component.js';

class Timer extends Component {
    render() {
        const dom = this.renderDOM();
        const timerButton = dom.querySelector('button');

        timerButton.addEventListener('click', () => {
            let dt = new Date();
            console.log(dt, 'before');
            dt.setSeconds(dt.getSeconds() + 10);
            console.log(dt, 'after');
        });

        return dom;
    }

    renderTemplate() {
        return `
        <div>
            <button>Start Timer</button>
            <p>Time: </p>
        </div>
        `;
    }
}

export default Timer;