import Component from '../Component.js';
import { auth, lotsRef, productsRef, productsByLotRef } from '../services/firebase.js';

class AddLot extends Component {
    render() {
        const dom = this.renderDOM();
        const form = dom.querySelector('form');
        const lotNameInput = form.querySelector('input[name=lot-name]');

        const addLotFormButton = dom.querySelector('.add-lot-form-button');

        addLotFormButton.addEventListener('click', () => {
            const modal = dom.querySelector('#myModal');
            modal.style.display = 'block';
            productForm.style.display = 'none';
        });

        let currentLotRef = null;

        //event listener for Lot
        form.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(form);

            const lotRef = lotsRef.push();
            currentLotRef = lotRef;

            lotRef.set({ 
                key: lotRef.key,
                lotName: formData.get('lot-name'),
                owner: auth.currentUser.uid
            });

            productForm.style.display = 'block';
            lotForm.style.display = 'none';
        });

        const productForm = dom.querySelector('.modal-products');
        const lotForm = dom.querySelector('.modal-content');
        
        productForm.addEventListener('submit', event => {
            event.preventDefault();
            const formData = new FormData(productForm);
            const productRef = productsRef.push();
            
            productRef.set({ 
                lotKey: currentLotRef.key, //might not need
                key: productRef.key,
                productName: formData.get('product-name'),
                productURL: formData.get('product-image')
            });

            productsByLotRef
                .child(currentLotRef.key)
                .child(productRef.key)
                .set({
                    key: productRef.key
                });

            productForm.reset();
            lotNameInput.focus();
            document.activeElement.blur();
        
        });
      
        const modal = form.querySelector('#myModal');

        window.onclick = function(event) {

            if(event.target === modal) {
                modal.style.display = 'none';
            } 
        };

        const closeModalButton = dom.querySelector('.close-modal');

        closeModalButton.addEventListener('click', () => {
            if(window.confirm('Are you done adding products?')) {
                const modal = dom.querySelector('#myModal');
                modal.style.display = 'none';
            } else {
                const modal = dom.querySelector('#myModal');
                modal.style.display = 'block';
            }

        });

        return dom;
    }

    renderTemplate() {
        return /*html*/`
        <div class="add-lot-container">
            <h2>LOTS</h2>
                <div id="myModal" class="modal">
                    <form class="modal-content">
                        <label>Lot Name: <input name="lot-name" required></label>
                        <button class="add-lot-to-database">Add Lot</button>
                    </form>
                    <form class="modal-products">
                        <label>Product Name: <input name="product-name" required></label>
                        <label>Product Image URL: <input name="product-image" required></label>
                        <button class="add-products-to-database">Add Products</button>
                    </form>
                    <button id="close-modal" class="close-modal">DONE</button>
                </div>
                <button class="add-lot-form-button"><img src="../../assets/add-button.png"></button>
        </div>
        `;
            

    }
}

export default AddLot;