// Cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
  let item = cart.find(i => i.name === name);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Display cart
function displayCart() {
  let table = document.getElementById("cart-items");
  let total = 0;

  if (!table) return;

  table.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    table.innerHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>P${item.price * item.quantity}</td>
        <td><button onclick="removeItem(${index})">X</button></td>
      </tr>
    `;
  });

  document.getElementById("total").innerText = "Total: P" + total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Run cart display on page load
window.onload = displayCart;
