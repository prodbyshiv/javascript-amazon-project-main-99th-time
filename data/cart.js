 export let cart = JSON.parse(localStorage.getItem('cart'));

 if (!cart) {
     cart = [];
 }
 

 function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
 }

 export function addTocart(productID) {

        let matchingItem;
        cart.forEach((cartItem)=>{
            if (productID===cartItem.id) {
                matchingItem = cartItem; 
            }
        })
        if (matchingItem) {
            matchingItem.quantity++;
        }
        else{
            cart.push({
            id: productID,
            quantity: 1
        });
        }
        
        saveToStorage();
        }


 export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if (cartItem.id !== productId) {
            newCart.push(cartItem); 
        }
    });

     cart = newCart;
     saveToStorage();
}

export function getTotalQuantity() {
    let total = 0;
    cart.forEach((cartItem) => {
        total += cartItem.quantity;
    });
    return total;
}