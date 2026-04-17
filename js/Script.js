// ==========================
// GLOBAL STORAGE
// ==========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let user = JSON.parse(localStorage.getItem("user")) || null;
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// ==========================
// THEME SYSTEM
// ==========================
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  let theme = document.body.classList.contains("light-mode")
    ? "light"
    : "dark";

  localStorage.setItem("theme", theme);
  updateThemeIcon();
}

function loadTheme() {
  let saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light-mode");
  }
  updateThemeIcon();
}

function updateThemeIcon() {
  let btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  btn.innerHTML = document.body.classList.contains("light-mode") ? "☀️" : "🌙";
}

// ==========================
// LOGIN SYSTEM
// ==========================
function login() {
  let username = document.getElementById("username").value;

  if (!username) return alert("Enter username");

  let role = username === "admin" ? "admin" : "customer";

  user = { name: username, role: role };
  localStorage.setItem("user", JSON.stringify(user));

  window.location.href = "index.html";
}

function logout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function showUser() {
  let el = document.getElementById("welcome");
  if (el && user) {
    el.innerText = "Welcome, " + user.name + " 👕";
  }
}

// ==========================
// CART SYSTEM
// ==========================
function addToCart(name, price, size, color) {
  let existing = cart.find(
    item =>
      item.name === name &&
      item.size === size &&
      item.color === color
  );

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, size, color, qty: 1 });
  }

  saveCart();
  alert("Added to cart 🛒");
}

function addItem1() {
  let size = document.getElementById("size1").value;
  let color = document.getElementById("color1").value;

  addToCart("Streetwear Tee", 130, size, color);
}

function addProduct() {
  let size = document.getElementById("size").value;
  let color = document.getElementById("color").value;

  addToCart("Urban Black Tee", 120, size, color);
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// ==========================
// CART DISPLAY
// ==========================
function displayCart() {
  let container = document.getElementById("cartItems");
  let total = 0;

  if (!container) return;

  container.innerHTML = "";

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.name}</b><br>
          ${item.size}, ${item.color}<br>
          Qty: ${item.qty} | P${item.price}
        </div>

        <div>
          <button onclick="increaseQty(${index})">+</button>
          <button onclick="decreaseQty(${index})">-</button>
          <button onclick="removeItem(${index})">❌</button>
        </div>
      </div>
    `;
  });

  document.getElementById("totalPrice").innerText = total;
}

// ==========================
// CART ACTIONS
// ==========================
function increaseQty(i) {
  cart[i].qty++;
  saveCart();
  displayCart();
}

function decreaseQty(i) {
  if (cart[i].qty > 1) {
    cart[i].qty--;
  } else {
    cart.splice(i, 1);
  }
  saveCart();
  displayCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  displayCart();
}

// ==========================
// CHECKOUT SYSTEM
// ==========================
function calculateTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getDeliveryFee() {
  let loc = document.getElementById("location");
  return loc ? parseInt(loc.value) : 0;
}

function placeOrder() {
  if (!user) {
    alert("Please login first");
    window.location.href = "login.html";
    return;
  }

  let order = {
    id: "ORD-" + Date.now(),
    user: user.name,
    items: cart,
    total: calculateTotal() + getDeliveryFee(),
    status: "Processing",
    date: new Date().toLocaleString()
  };

  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
  localStorage.setItem("currentOrder", JSON.stringify(order));

  cart = [];
  saveCart();

  window.location.href = "tracking.html";
}

// ==========================
// TRACKING SYSTEM
// ==========================
function loadTracking() {
  let order = JSON.parse(localStorage.getItem("currentOrder"));
  if (!order) return;

  document.getElementById("orderId").innerText = order.id;

  let steps = ["Processing", "Shipped", "Delivered"];
  let i = 0;

  setInterval(() => {
    if (i < steps.length) {
      document.getElementById("status").innerText = steps[i];
      i++;
    }
  }, 3000);
}

// ==========================
// ADMIN DASHBOARD
// ==========================
function loadAdmin() {
  let container = document.getElementById("orders");
  if (!container) return;

  container.innerHTML = "";

  orders.forEach(o => {
    container.innerHTML += `
      <div class="card">
        <b>${o.id}</b><br>
        ${o.user}<br>
        P${o.total}<br>
        ${o.status}
      </div>
    `;
  });
}

// ==========================
// INIT (RUN ON EVERY PAGE)
// ==========================
function init() {
  loadTheme();
  showUser();
  displayCart();
  loadTracking();
  loadAdmin();
}

init();
