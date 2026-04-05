export let cart = JSON.parse(localStorage.getItem('nike-cart'));

if (!cart) {
    cart = [];
}

function saveToStorage() {
    localStorage.setItem('nike-cart', JSON.stringify(cart));
}

export function addToBag(productID) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productID === cartItem.id) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity++;
    } else {
        cart.push({
            id: productID,
            quantity: 1
        });
    }
    saveToStorage();
}

export function removeFromBag(productId) {
    const newCart = [];
    cart.forEach((cartItem) => {
        if (cartItem.id !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToStorage();
}

export function updateQuantity(productId, quantity) {
    cart.forEach((cartItem) => {
        if (cartItem.id === productId) {
            cartItem.quantity = quantity;
        }
    });
    saveToStorage();
}

export function getTotalQuantity() {
    let total = 0;
    cart.forEach((cartItem) => {
        total += cartItem.quantity;
    });
    return total;
}
