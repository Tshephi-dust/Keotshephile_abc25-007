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
  let itemsTotal = 0;

  if (!cartContainer) return;

  cartContainer.innerHTML = "";

  cart.forEach((item, index) => {
    itemsTotal += item.price;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - P${item.price}</span>
        <button class="btn remove-btn" onclick="removeItem(${index})">
          Remove
        </button>
      </div>
    `;
  });

  document.getElementById("itemsTotal").innerText = itemsTotal;

  updateTotal();
}

// Update total with delivery
function updateTotal() {
  let itemsTotal = 0;

  cart.forEach(item => {
    itemsTotal += item.price;
  });

  let location = document.getElementById("location");
  let deliveryFee = location ? parseInt(location.value) : 0;

  document.getElementById("deliveryFee").innerText = deliveryFee;
  document.getElementById("totalPrice").innerText = itemsTotal + deliveryFee;
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

// Load page
displayCart();
