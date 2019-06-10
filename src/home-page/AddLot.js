import Component from '../Component.js';
import { auth, lotsRef, productsRef, productsByLotRef } from '../services/firebase.js';

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

            const productRef = productsRef.push();

            productRef.set({ 
                lotKey: lotRef.key, //might not need
                key: productRef.key,
                productName: formData.get('product-name'),
                productURL: formData.get('product-image')
            });

            productsByLotRef
                .child(lotRef.key)
                .child(productRef.key)
                .set({
                    key: productRef.key
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
                <label>Lot Name: <input name="lot-name"></label>
                <label>Product Name: <input name="product-name"></label>
                <label>Product Image URL: <input name="product-image"></label>
                <!-- default balance -->
                <!-- default time per product -->
                <button>Add</button>
            </form>
        `;

    }
}

export default AddLot;