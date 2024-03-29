import Component from '../Component.js';
import { auth, lotsRef, productsRef, productsByLotRef } from '../services/firebase.js';
class AddLot extends Component {
    render() {
        const dom = this.renderDOM();
        const form = dom.querySelector('form');
        const productForm = dom.querySelector('.modal-products');
        const modal = form.querySelector('#myModal');
        const addLotFormButton = dom.querySelector('.add-button');
        addLotFormButton.addEventListener('click', () => {
            const modal = dom.querySelector('#myModal');
            modal.style.display = 'block';
            productForm.style.display = 'none';
        });
        
        //event listener for Lot
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
                
            const modal = dom.querySelector('#myModal');
            modal.style.display = 'none';
            form.reset();
        });
        window.onclick = function(event) {
            if(event.target === modal) {
                modal.style.display = 'none';
            } 
        };
        const closeModalButton = dom.querySelector('.close-modal');
        closeModalButton.addEventListener('click', () => {
            const modal = dom.querySelector('#myModal');
            modal.style.display = 'none';
            form.reset();
        });
        return dom;
    }
    renderTemplate() {
        return /*html*/`
        <div class="modal-container">
            <h2>AUCTION LOTS</h2>
            <div>
                <button class="add-button"></button>
            </div>
            <div id="myModal" class="modal overlay">
                <form class="modal-content">
                    <div class="modal-one">
                        <label>Lot Name: <input name="lot-name" required></label>
                    </div>
                    <div>
                        <label>Product Name: <input name="product-name" required></label>
                    </div>
                    <div>
                        <label>Product Image URL: <input name="product-image" required></label>
                    </div>
                    <button class="add-products-to-database">ADD</button>
                </form>
                <a id="close-modal" class="close-modal">&times;</a>
            </div>
        </div>
        `;

        
            
    }
}
export default AddLot;