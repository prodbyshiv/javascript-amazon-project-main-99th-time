import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import { cart, removeFromCart, getTotalQuantity, updateQuantity } from "../data/cart.js";

function updateHeaderQuantity() {
  document.querySelector('.js-retun-to-home-link').innerHTML = `${getTotalQuantity()} items`;
}

let checkoutpageHTML = '';
let matchingItem;
cart.forEach((cartItem)=>{

    products.forEach((product)=>{
        if (cartItem.id===product.id) {
            matchingItem = product;
        }
    });

    if (matchingItem) {
        checkoutpageHTML += `
         <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingItem.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link"
                  data-product-id=${matchingItem.id}>
                    Update
                  </span>
                  <input class="quantity-input" type="number" min="1" value="${cartItem.quantity}">
                  <span class="save-quantity-link js-save-quantity-link"
                  data-product-id=${matchingItem.id}>
                    Save
                  </span>
                  <span class="delete-quantity-link link-primary 
                  js-delete-link" 
                  data-product-id = ${matchingItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
    }
});
document.querySelector('.js-order-summary').innerHTML = checkoutpageHTML;

updateHeaderQuantity();

document.querySelectorAll('.js-delete-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    
    removeFromCart(productId);
    console.log(cart);
    
    const elementTodelete =  document.querySelector(`.js-cart-item-container-${productId}`);
    elementTodelete.remove();
    
    updateHeaderQuantity();
   
  })
})

document.querySelectorAll('.js-update-quantity-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const itemContainer = link.closest('.cart-item-container');
    const input = itemContainer.querySelector('.quantity-input');
    input.value = itemContainer.querySelector('.quantity-label').textContent.trim();
    itemContainer.classList.add('is-editing-quantity');
    input.focus();
  })
})

document.querySelectorAll('.js-save-quantity-link')
.forEach((link)=>{
  link.addEventListener('click',()=>{
    const productId = link.dataset.productId;
    const itemContainer = link.closest('.cart-item-container');
    const input = itemContainer.querySelector('.quantity-input');
    const newQuantity = Number(input.value);

    if (!Number.isInteger(newQuantity) || newQuantity < 1 || newQuantity >= 1000) {
      input.value = itemContainer.querySelector('.quantity-label').textContent.trim();
      return;
    }

    updateQuantity(productId, newQuantity);
    itemContainer.querySelector('.quantity-label').textContent = newQuantity;
    itemContainer.classList.remove('is-editing-quantity');
    updateHeaderQuantity();
  })
})

document.querySelectorAll('.quantity-input')
.forEach((input)=>{
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const itemContainer = input.closest('.cart-item-container');
      const saveLink = itemContainer.querySelector('.js-save-quantity-link');
      saveLink.click();
    }
  });
})