import Component from '../Component.js';
import { auth, lotsRef, productsRef, productsByLotRef } from '../services/firebase.js';

class AddLot extends Component {
    render() {
        const form = this.renderDOM();
        const lotNameInput = form.querySelector('input[name=lot-name]');

        const addLotFormButton = form.querySelector('.add-lot-form-button');

        addLotFormButton.addEventListener('click', () => {
            const modal = form.querySelector('#myModal');
            modal.style.display = 'block';
        });

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

            const modal = form.querySelector('#myModal');
            modal.style.display = 'none';

        });

        const modal = form.querySelector('#myModal');

        window.onclick = function(event) {

            if(event.target === modal) {
                modal.style.display = 'none';
            } 
        };

        const closeModalButton = form.querySelector('.close-modal');

        closeModalButton.addEventListener('click', () => {
            const modal = form.querySelector('#myModal');
            modal.style.display = 'none';
        });

        return form;
    }

    renderTemplate() {
        return /*html*/`
        <div>
            <div id="myModal" class="modal">
                <form class="modal-content">
                    <label>Lot Name: <input name="lot-name"></label>
                    <label>Product Name: <input name="product-name"></label>
                    <label>Product Image URL: <input name="product-image"></label>
                    <label>Product Name: <input name="product-name"></label>
                    <label>Product Image URL: <input name="product-image"></label>
                    <button class="add-lot-to-database">Add</button>
                </form>
                <button id="close-modal" class="close-modal">Close</button>
            </div>

            <button class="add-lot-form-button">Add Room and Items</button>
        </div>
        `;
            

    }
}

export default AddLot;