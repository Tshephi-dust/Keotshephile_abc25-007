function displayCart() {
  let container = document.getElementById("cartItems");
  let total = 0;

  if (!container) return;

  container.innerHTML = "";
  function login() {
  let user = document.getElementById("username").value;

  if (!user) return alert("Enter username");

  let role = user === "admin" ? "admin" : "customer";

  localStorage.setItem("user", JSON.stringify({
    name: user,
    role: role
  }));
    let user = JSON.parse(localStorage.getItem("user"));

if (user) {
  console.log("Logged in as:", user.name, user.role);
}

  window.location.href = "index.html";
}
  function createOrder() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  return {
    id: "ORD-" + Date.now(),
    user: user.name,
    role: user.role,
    items: cart,
    status: "Processing",
    timeline: [
      { stage: "Processing", time: new Date().toLocaleString() }
    ],
    total: calculateTotal(cart),
    createdAt: new Date().toISOString()
  };
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
  function saveOrder(order) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders.push(order);

  localStorage.setItem("orders", JSON.stringify(orders));
}
  function updateOrderStatus(orderId, newStatus) {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  orders = orders.map(order => {
    if (order.id === orderId) {
      order.status = newStatus;
      order.timeline.push({
        stage: newStatus,
        time: new Date().toLocaleString()
      });
    }
    return order;
  });

  localStorage.setItem("orders", JSON.stringify(orders));
}
  function getAnalytics() {
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  let totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  let avgOrder = orders.length ? totalRevenue / orders.length : 0;

  return {
    totalOrders: orders.length,
    revenue: totalRevenue,
    averageOrder: avgOrder
  };
}
  function recommend(cart) {
  let suggestions = [];

  let names = cart.map(i => i.name);

  if (names.includes("Streetwear Tee")) {
    suggestions.push("Oversized Hoodie");
  }

  if (names.includes("Black Tee")) {
    suggestions.push("White Minimal Tee");
  }

  return suggestions;
}
  function placeOrder() {
  let order = createOrder();

  saveOrder(order);

  localStorage.setItem("order", JSON.stringify(order));

  localStorage.removeItem("cart");

  window.location.href = "tracking.html";
}
  

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    container.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.name}</b><br>
          Size: ${item.size} | Color: ${item.color}<br>
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
  localStorage.setItem("cart", JSON.stringify(cart));
}
// =========================
// DARK / LIGHT MODE ENGINE
// =========================

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  let theme = document.body.classList.contains("light-mode")
    ? "light"
    : "dark";

  localStorage.setItem("theme", theme);

  updateThemeIcon();
}

// Load saved theme
function loadTheme() {
  let savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  updateThemeIcon();
}

// Update icon (🌙 / ☀️)
function updateThemeIcon() {
  let btn = document.querySelector(".theme-toggle");

  if (!btn) return;

  if (document.body.classList.contains("light-mode")) {
    btn.innerHTML = "☀️";
  } else {
    btn.innerHTML = "🌙";
  }
}

// Run on page load
loadTheme();
