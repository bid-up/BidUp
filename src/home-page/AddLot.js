import Component from '../Component.js';
import { auth, lotsRef } from '../services/firebase.js';

class AddLot extends Component {
    render() {
        const form = this.renderDOM();
        const lotNameInput = form.querySelector('input[name=lot-name]');

        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);

            const lotRef = lotsRef.push();

            lotRef.set({ 
                key: lotRef.key,
                lotName: formData.get('lot-name'),
                owner: auth.currentUser.uid
            });

            form.reset();
            lotNameInput.focus();
            document.activeElement.blur();
        });

        

        return form;
    }
    renderTemplate() {
        return /*html*/`
            <form>
                <input name="lot-name">
                <button>Add</button>
            </form>
        `;

    }
}

export default AddLot;