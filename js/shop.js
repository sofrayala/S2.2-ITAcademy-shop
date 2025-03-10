// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [
  {
    id: 1,
    name: "cooking oil",
    price: 10.5,
    type: "grocery",
    offer: {
      number: 3,
      percent: 20,
    },
  },
  {
    id: 2,
    name: "Pasta",
    price: 6.25,
    type: "grocery",
  },
  {
    id: 3,
    name: "Instant cupcake mixture",
    price: 5,
    type: "grocery",
    offer: {
      number: 10,
      percent: 30,
    },
  },
  {
    id: 4,
    name: "All-in-one",
    price: 260,
    type: "beauty",
  },
  {
    id: 5,
    name: "Zero Make-up Kit",
    price: 20.5,
    type: "beauty",
  },
  {
    id: 6,
    name: "Lip Tints",
    price: 12.75,
    type: "beauty",
  },
  {
    id: 7,
    name: "Lawn Dress",
    price: 15,
    type: "clothes",
  },
  {
    id: 8,
    name: "Lawn-Chiffon Combo",
    price: 19.99,
    type: "clothes",
  },
  {
    id: 9,
    name: "Toddler Frock",
    price: 9.99,
    type: "clothes",
  },
];

// => Reminder, it's extremely important that you debug your code.
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster.
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
  // 1. Loop for to the array products to get the item to add to cart
  const product = products.find((product) => product.id === id);
  // 2. Add found product to the cart array
  const cartItem = cart.find((item) => item.id === id);
  if (cartItem) {
    cartItem.quantity += 1;
    console.log(`Increased qty of ${product.name}`);
  } else {
    const newCartItem = { ...product, quantity: 1 };
    cart.push(newCartItem);
    console.log(`Added ${product.name} to the cart`);
  }
  console.log("Cart:", cart);
}

// Exercise 2

function cleanCart() {
  if (cart.length > 0) {
    cart.splice(0);
    console.log(cart);
  } else {
    console.log("Cart is empty");
  }
}

// Exercise 3
function calculateTotal() {
  // Calculate total price of the cart using the "cartList" array
  let total = 0;

  applyPromotionsCart();

  for (let i = 0; i < cart.length; i++) {
    total += cart[i].subtotalWithDiscount;
  }
  console.log(total);
  return total;
}

// Exercise 4
function applyPromotionsCart() {
  // Apply promotions to each item in the array "cart"

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === 1 && cart[i].quantity >= 3) {
      cart[i].subtotalWithDiscount = cart[i].price * 0.8 * cart[i].quantity;
    } else if (cart[i].id === 3 && cart[i].quantity >= 10) {
      cart[i].subtotalWithDiscount = cart[i].price * 0.7 * cart[i].quantity;
    } else {
      cart[i].subtotalWithDiscount = cart[i].price * cart[i].quantity;
    }
  }
}

// Exercise 5
function printCart() {
  // Fill the shopping cart modal manipulating the shopping cart dom
  const cartTableBody = document.getElementById("cart_list");
  const totalPriceElement = document.getElementById("total_price");

  cartTableBody.innerHTML = "";

  let totalPrice = 0;
  let itemCount = 0;

  cart.forEach((item) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("th");
    nameCell.setAttribute("scope", "row");
    nameCell.textContent = item.name;
    row.appendChild(nameCell);

    const priceCell = document.createElement("td");
    priceCell.textContent = `$${item.price.toFixed(2)}`;
    row.appendChild(priceCell);

    const quantityCell = document.createElement("td");
    quantityCell.textContent = item.quantity;
    row.appendChild(quantityCell);

    const subtotalCell = document.createElement("td");
    const subtotal = item.subtotalWithDiscount || item.price * item.quantity;
    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    row.appendChild(subtotalCell);

    //Remove item
    const removeCell = document.createElement("td");
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.className = "btn btn-danger btn-sm";
    removeButton.onclick = () => removeFromCart(item.id);
    removeCell.appendChild(removeButton);
    row.appendChild(removeCell);

    cartTableBody.appendChild(row);

    totalPrice += subtotal;
    itemCount += item.quantity;
  });

  totalPriceElement.textContent = totalPrice.toFixed(2);

  const countProductElement = document.getElementById("count_product");
  countProductElement.textContent = itemCount;

  const cartModal = new bootstrap.Modal(document.getElementById("cartModal"));
  cartModal.show();
}

// ** Nivell II **

// Exercise 7

function removeFromCart(id) {
  const productId = cart.findIndex((item) => item.id === id);

  if (productId !== -1) {
    cart[productId].quantity--;

    if (cart[productId].quantity === 0) {
      cart.splice(productId, 1);
    }
    applyPromotionsCart();
    printCart();
  }
}

function open_modal() {
  printCart();
}
