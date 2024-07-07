const cartItems = [
  {
    id: 1,
    name: "iPhone 20 Plus",
    quantity: 3,
    price: 1000,
  },
];

function calculateTotalPrice(items) {
  return items.reduce((total, item) => total + item.quantity * item.price, 0);
}

function addItem(cartItems, item) {
  const addedItems = [...cartItems];

  addedItems.push(item);

  return {
    items: addedItems,
    total: calculateTotalPrice(addedItems),
  };
}

function removeItem(cartItems, itemId) {
  const remainingItems = cartItems.filter((item) => item.id !== itemId);

  if (remainingItems.length === cartItems.length) {
    throw Error("Item does not exist.");
  }

  return {
    items: remainingItems,
    total: calculateTotalPrice(remainingItems),
  };
}

function increaseItemQuantityInCart(cartItems, itemId) {
  const modifiedItems = cartItems.map((item) => {
    if (item.id === itemId) {
      return { ...item, quantity: item.quantity + 1 };
    } else {
      return item;
    }
  });

  return {
    items: modifiedItems,
    total: calculateTotalPrice(modifiedItems),
  };
}

const newItem = {
  id: 2,
  name: "play station 1",
  quantity: 1,
  price: 10000,
};

const newCart = addItem(cartItems, newItem);
const newCart2 = removeItem(newCart.items, 1);

calculateTotalPrice(cartItems);
newCart;
newCart2;
increaseItemQuantityInCart(newCart2.items, 2);

console.log(cartItems);
