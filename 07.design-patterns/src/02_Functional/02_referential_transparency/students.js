const cart = [];

function addItemToCart(cart, item, price) {
  const updatedCart = [...cart];

  updatedCart.push({ item, price });

  return updatedCart;
}

function removedItemFromCart(cart, item) {
  const updatedCart = cart.filter((cartItem) => cartItem.item !== item);

  return updatedCart;
}

function calculateTotalPrice(cart) {
  return cart.reduce((total, cartItem) => total + cartItem.price, 0);
}

function applyDiscount(cart, discountPercent) {
  const discountFactor = 1 - discountPercent / 100;
  const discountedCart = cart.map((cartItem) => ({
    ...cartItem,
    price: cartItem.price * discountFactor,
  }));

  return discountedCart;
}

const newItem = "iphone";

const newCart = addItemToCart(cart, newItem, 1000);
removedItemFromCart(newCart, newItem);
calculateTotalPrice(newCart);
applyDiscount(newCart, 50);
