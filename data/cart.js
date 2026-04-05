 export const cart = []
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
        
        }


 export function removeFromCart(productId){
    const newCart = [];

    cart.forEach((cartItem)=>{
        if (cartItem.id !== productId) {
            newCart.push(cartItem); 
        }
    });
    
    cart = newCart;
}