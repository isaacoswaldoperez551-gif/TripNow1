// vehicles ahora viene de js/data.js (compartido con el panel de admin)
const vehicles = getVehicles();

const PLACEHOLDER_BG = "0E1B30";
const PLACEHOLDER_FG = "F6F4EE";

function imageWithFallback(v) {
  const placeholder = `https://placehold.co/480x360/${PLACEHOLDER_BG}/${PLACEHOLDER_FG}?font=roboto&text=${encodeURIComponent(v.brand + " " + v.name)}`;
  return `<img src="${v.imageUrl}" alt="${v.brand} ${v.name}" onerror="this.onerror=null;this.src='${placeholder}';" />`;
}

const filters = {
  type: "Todos",
  transmission: "Todos",
  fuel: "Todos",
  minPassengers: 1,
};

// días seleccionados por vehículo, para que el cálculo persista al re-renderizar
const daysById = {};

function applyFilters() {
  return vehicles.filter((v) => {
    if (v.paused) return false;
    if (filters.type !== "Todos" && v.type !== filters.type) return false;
    if (filters.transmission !== "Todos" && v.transmission !== filters.transmission) return false;
    if (filters.fuel !== "Todos" && v.fuel !== filters.fuel) return false;
    if (v.passengers < filters.minPassengers) return false;
    return true;
  });
}

function vehicleCardHTML(v) {
  const days = daysById[v.id] || 1;
  const total = v.pricePerDay * days;
  const outOfStock = v.stock === 0;

  return `
    <div class="v-card">
      <div class="v-thumb">
        ${imageWithFallback(v)}
        ${outOfStock ? `<span class="badge-stock">${t("badge_out_of_stock")}</span>` : ""}
      </div>
      <div class="v-body">
        <div class="v-title-row">
          <h3>${v.brand} ${v.name}</h3>
          <span>${valueLabel(v.type)}</span>
        </div>
        <dl class="v-specs">
          <dt>${t("spec_transmission")}</dt><dd>${valueLabel(v.transmission)}</dd>
          <dt>${t("spec_fuel")}</dt><dd>${valueLabel(v.fuel)}</dd>
          <dt>${t("spec_passengers")}</dt><dd>${v.passengers}</dd>
          <dt>${t("spec_available")}</dt><dd>${v.stock}</dd>
        </dl>
        <div class="v-price-row">
          <div class="days-control">
            ${t("days_label")}
            <div class="stepper">
              <button type="button" ${outOfStock ? "disabled" : ""} onclick="changeDays('${v.id}', -1)" aria-label="Reducir días">−</button>
              <span>${days}</span>
              <button type="button" ${outOfStock ? "disabled" : ""} onclick="changeDays('${v.id}', 1)" aria-label="Aumentar días">+</button>
            </div>
          </div>
          <div class="price-block">
            <div class="price-per-day">$${v.pricePerDay}${t("per_day")}</div>
            <div class="price-total">$${total}</div>
          </div>
        </div>
        <button class="btn btn-primary v-cta" ${outOfStock ? "disabled" : ""} onclick="addToCart('${v.id}')">
          ${outOfStock ? t("btn_unavailable") : t("btn_add_cart")}
        </button>
      </div>
    </div>
  `;
}

/* ---------- Carrito (persistido en localStorage) ---------- */
const CART_KEY = "tripnow_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(vehicleId) {
  const vehicle = vehicles.find((v) => v.id === vehicleId);
  const days = daysById[vehicleId] || 1;
  const cart = getCart();

  const existing = cart.find((item) => item.vehicleId === vehicleId);
  if (existing) {
    existing.days = days;
  } else {
    cart.push({ vehicleId, days });
  }
  saveCart(cart);

  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = t("added_check");
  setTimeout(() => (btn.textContent = original), 1200);
}

function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;
  const count = getCart().length;
  badge.textContent = count;
  badge.style.display = count > 0 ? "inline-flex" : "none";
}

function render() {
  const filtered = applyFilters();
  const grid = document.getElementById("catalogGrid");
  const countEl = document.getElementById("resultCount");

  countEl.textContent =
    filtered.length + " " + (filtered.length === 1 ? t("result_count_one") : t("result_count_many")) +
    " " + t("result_count_suffix");

  if (filtered.length === 0) {
    grid.innerHTML = `<p class="empty-state">${t("empty_catalog")}</p>`;
    grid.style.display = "block";
  } else {
    grid.style.display = "grid";
    grid.innerHTML = filtered.map(vehicleCardHTML).join("");
  }
}

function changeDays(id, delta) {
  const current = daysById[id] || 1;
  daysById[id] = Math.max(1, current + delta);
  render();
}

function setTypeFilter(type, btn) {
  filters.type = type;
  document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
  btn.classList.add("active");
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("transmissionSelect").addEventListener("change", (e) => {
    filters.transmission = e.target.value;
    render();
  });
  document.getElementById("fuelSelect").addEventListener("change", (e) => {
    filters.fuel = e.target.value;
    render();
  });
  document.getElementById("passengersSelect").addEventListener("change", (e) => {
    filters.minPassengers = Number(e.target.value);
    render();
  });

  // Re-renderiza las tarjetas (que tienen texto dinámico) al cambiar de idioma
  window.onLangChange = render;
  initLangToggle();

  render();
  updateCartBadge();
});
