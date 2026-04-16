// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to cart
function addToCart(name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart!");
}

// Display cart
function displayCart() {
  let cartContainer = document.getElementById("cartItems");
  let total = 0;

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - P${item.price}</span>
        <button class="btn remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = total;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Clear cart
function clearCart() {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Run on page load
displayCart();
