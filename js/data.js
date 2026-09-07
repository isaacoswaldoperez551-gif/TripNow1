/* ---------- Semilla inicial ---------- */
const VEHICLES_SEED = [
  { id: "v1", name: "Hilux", brand: "Toyota", type: "Camioneta", transmission: "Automático", fuel: "Gasolina", passengers: 5, pricePerDay: 55, stock: 6, paused: false, imageUrl: "images/vehicles/hilux.jpg" },
  { id: "v2", name: "L200", brand: "Mitsubishi", type: "Camioneta", transmission: "Manual", fuel: "Gasolina", passengers: 5, pricePerDay: 50, stock: 3, paused: false, imageUrl: "images/vehicles/l200.jpg" },
  { id: "v3", name: "Corolla", brand: "Toyota", type: "Sedán", transmission: "Automático", fuel: "Híbrido", passengers: 5, pricePerDay: 38, stock: 8, paused: false, imageUrl: "images/vehicles/corolla.jpg" },
  { id: "v4", name: "Model 3", brand: "Tesla", type: "Sedán", transmission: "Automático", fuel: "Eléctrico", passengers: 5, pricePerDay: 70, stock: 2, paused: false, imageUrl: "images/vehicles/model3.jpg" },
  { id: "v5", name: "CB190R", brand: "Honda", type: "Motocicleta", transmission: "Manual", fuel: "Gasolina", passengers: 2, pricePerDay: 18, stock: 10, paused: false, imageUrl: "images/vehicles/cb190r.jpg" },
  { id: "v6", name: "CX-5", brand: "Mazda", type: "SUV", transmission: "Automático", fuel: "Gasolina", passengers: 5, pricePerDay: 48, stock: 4, paused: false, imageUrl: "images/vehicles/cx5.jpg" },
  { id: "v7", name: "Picanto", brand: "Kia", type: "Compacto", transmission: "Manual", fuel: "Gasolina", passengers: 4, pricePerDay: 25, stock: 5, paused: false, imageUrl: "images/vehicles/picanto.jpg" },
  { id: "v8", name: "Kicks", brand: "Nissan", type: "SUV", transmission: "Automático", fuel: "Híbrido", passengers: 5, pricePerDay: 45, stock: 0, paused: false, imageUrl: "images/vehicles/kicks.jpg" },
];

const BRANCHES_SEED = [
  { id: "b1", name: "Trip Now San Salvador (Central)", address: "Alameda Roosevelt, San Salvador", lat: 13.6989, lng: -89.2182, hours: "Lun–Sáb 7:00am–7:00pm", phone: "+503 2222-0000" },
  { id: "b2", name: "Trip Now Santa Ana", address: "Av. Independencia Sur, Santa Ana", lat: 13.9942, lng: -89.5597, hours: "Lun–Sáb 8:00am–6:00pm", phone: "+503 2440-1111" },
  { id: "b3", name: "Trip Now San Miguel", address: "Av. Roosevelt Norte, San Miguel", lat: 13.4833, lng: -88.1833, hours: "Lun–Sáb 8:00am–6:00pm", phone: "+503 2661-2222" },
  { id: "b4", name: "Trip Now Aeropuerto (Comalapa)", address: "Aeropuerto Internacional El Salvador", lat: 13.4409, lng: -89.0558, hours: "Todos los días 5:00am–10:00pm", phone: "+503 2366-3333" },
];

const CLIENTS_SEED = [
  { id: "c1", nombre: "Ana Martínez", email: "ana.martinez@mail.com", reservas: 4, gastoTotal: 312 },
  { id: "c2", nombre: "Carlos Rivas", email: "carlos.rivas@mail.com", reservas: 1, gastoTotal: 55 },
  { id: "c3", nombre: "Fátima López", email: "fatima.lopez@mail.com", reservas: 7, gastoTotal: 890 },
  { id: "c4", nombre: "Josué Hernández", email: "josue.hdz@mail.com", reservas: 2, gastoTotal: 140 },
];

const VEHICLES_KEY = "tripnow_vehicles";
const BRANCHES_KEY = "tripnow_branches";
const CLIENTS_KEY = "tripnow_clients";

function getVehicles() {
  const raw = localStorage.getItem(VEHICLES_KEY);
  if (!raw) {
    localStorage.setItem(VEHICLES_KEY, JSON.stringify(VEHICLES_SEED));
    return structuredClone(VEHICLES_SEED);
  }
  return JSON.parse(raw);
}

function saveVehicles(vehicles) {
  localStorage.setItem(VEHICLES_KEY, JSON.stringify(vehicles));
}

function getBranches() {
  const raw = localStorage.getItem(BRANCHES_KEY);
  if (!raw) {
    localStorage.setItem(BRANCHES_KEY, JSON.stringify(BRANCHES_SEED));
    return structuredClone(BRANCHES_SEED);
  }
  return JSON.parse(raw);
}

function saveBranches(branches) {
  localStorage.setItem(BRANCHES_KEY, JSON.stringify(branches));
}

function getClients() {
  const raw = localStorage.getItem(CLIENTS_KEY);
  if (!raw) {
    localStorage.setItem(CLIENTS_KEY, JSON.stringify(CLIENTS_SEED));
    return structuredClone(CLIENTS_SEED);
  }
  return JSON.parse(raw);
}

function saveClients(clients) {
  localStorage.setItem(CLIENTS_KEY, JSON.stringify(clients));
}

/* ---------- Eliminar cliente (real, no solo visual) ----------
   Se llama desde admin.html → Clientes. Borra al cliente de la lista
   persistida en localStorage, por lo que desaparece de verdad y no
   vuelve a aparecer al recargar la página. */
function deleteClient(id) {
  const clients = getClients().filter((c) => c.id !== id);
  saveClients(clients);
}

/* ---------- Registro real de clientes ----------
   Se llama desde index.html cuando alguien completa el formulario de
   "Cuéntanos un poco de ti". Si el correo ya existe, solo actualiza sus
   datos de contacto; si no existe, lo crea con reservas/gasto en 0.
   Así el panel de admin (sección "Clientes") refleja gente real. */
function registerClient(profile) {
  const clients = getClients();
  const email = (profile.email || "").trim().toLowerCase();
  let client = clients.find((c) => c.email.trim().toLowerCase() === email);

  if (client) {
    client.nombre = profile.nombre || client.nombre;
    client.telefono = profile.telefono || client.telefono;
  } else {
    client = {
      id: "c" + Date.now(),
      nombre: profile.nombre || "Cliente",
      email: profile.email || "",
      telefono: profile.telefono || "",
      reservas: 0,
      gastoTotal: 0,
    };
    clients.push(client);
  }

  saveClients(clients);
  return client;
}

/* ---------- Viajes / reservas ---------- */
const RESERVATIONS_KEY = "tripnow_reservations";

function getReservations() {
  const raw = localStorage.getItem(RESERVATIONS_KEY);
  if (!raw) {
    localStorage.setItem(RESERVATIONS_KEY, JSON.stringify([]));
    return [];
  }
  return JSON.parse(raw);
}

function saveReservations(reservations) {
  localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(reservations));
}

function addDays(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/* ---------- Procesar una compra/arrendamiento real ----------
   Se llama desde carrito.html al confirmar la reserva. Recibe el email
   del cliente, el carrito [{vehicleId, days}], la sucursal de entrega y
   la fecha de recogida elegidas por el usuario (ya no se salta ese paso).
   - Descuenta 1 unidad de stock por cada vehículo arrendado.
   - Crea un "viaje en proceso" por cada vehículo (visible en admin.html).
   - Suma la reserva y el gasto al cliente correspondiente.
   - Devuelve { total, reservations } o null si no hay stock disponible. */
function processPurchase(email, cart, branchId, pickupDate) {
  const vehicles = getVehicles();
  const clients = getClients();
  const branches = getBranches();
  const reservations = getReservations();
  const normalizedEmail = (email || "").trim().toLowerCase();

  // Verificar stock disponible antes de descontar nada
  for (const item of cart) {
    const v = vehicles.find((veh) => veh.id === item.vehicleId);
    if (!v || v.stock <= 0) return null;
  }

  const branch = branches.find((b) => b.id === branchId) || null;

  let client = clients.find((c) => c.email.trim().toLowerCase() === normalizedEmail);
  if (!client) {
    client = {
      id: "c" + Date.now(),
      nombre: "Cliente",
      email: email || "",
      telefono: "",
      reservas: 0,
      gastoTotal: 0,
    };
    clients.push(client);
  }

  let total = 0;
  const created = [];
  cart.forEach((item, idx) => {
    const v = vehicles.find((veh) => veh.id === item.vehicleId);
    v.stock = Math.max(0, v.stock - 1);
    const subtotal = v.pricePerDay * item.days;
    total += subtotal;

    const reservation = {
      id: "r" + Date.now() + idx,
      clientName: client.nombre,
      clientEmail: email || "",
      vehicleId: v.id,
      vehicleName: v.brand + " " + v.name,
      days: item.days,
      pickupDate: pickupDate,
      returnDate: addDays(pickupDate, item.days),
      branchId: branch ? branch.id : "",
      branchName: branch ? branch.name : "Sin definir",
      total: subtotal,
      status: "en_curso", // en_curso | finalizado | cancelado
      createdAt: new Date().toISOString(),
    };
    reservations.push(reservation);
    created.push(reservation);
  });

  saveVehicles(vehicles);
  saveReservations(reservations);

  client.reservas += cart.length;
  client.gastoTotal += total;
  saveClients(clients);

  return { total, reservations: created };
}

/* ---------- Acciones de admin sobre un viaje ----------
   Al finalizar (vehículo devuelto) o cancelar, la unidad vuelve al stock
   disponible del vehículo. */
function setReservationStatus(id, status) {
  const reservations = getReservations();
  const reservation = reservations.find((r) => r.id === id);
  if (!reservation || reservation.status !== "en_curso") return;

  reservation.status = status;
  saveReservations(reservations);

  if (status === "finalizado" || status === "cancelado") {
    const vehicles = getVehicles();
    const v = vehicles.find((veh) => veh.id === reservation.vehicleId);
    if (v) v.stock += 1;
    saveVehicles(vehicles);
  }
}

/* ---------- Modificar una reserva ya confirmada ----------
   Se llama desde mis-reservas.html cuando el cliente cambia la fecha de
   recogida, la sucursal o los días de una reserva "en_curso". Cada
   modificación tiene un costo adicional fijo (MODIFICATION_FEE), que se
   suma al total de la reserva y al gasto acumulado del cliente.
   Devuelve { reservation, fee, newTotal } o null si no se puede modificar. */
const MODIFICATION_FEE = 15;

function modifyReservation(id, { pickupDate, branchId, days }) {
  const reservations = getReservations();
  const reservation = reservations.find((r) => r.id === id);
  if (!reservation || reservation.status !== "en_curso") return null;

  const vehicles = getVehicles();
  const vehicle = vehicles.find((v) => v.id === reservation.vehicleId);
  const branches = getBranches();
  const branch = branches.find((b) => b.id === branchId);

  const newDays = Math.max(1, Number(days) || reservation.days);
  const newSubtotal = vehicle ? vehicle.pricePerDay * newDays : reservation.total - (reservation.extraFees || 0);
  const newExtraFees = (reservation.extraFees || 0) + MODIFICATION_FEE;
  const newTotal = newSubtotal + newExtraFees;
  const delta = newTotal - reservation.total;

  reservation.pickupDate = pickupDate || reservation.pickupDate;
  reservation.days = newDays;
  reservation.returnDate = addDays(reservation.pickupDate, newDays);
  if (branch) {
    reservation.branchId = branch.id;
    reservation.branchName = branch.name;
  }
  reservation.extraFees = newExtraFees;
  reservation.total = newTotal;

  saveReservations(reservations);

  // Refleja el cargo adicional en el gasto total del cliente
  const clients = getClients();
  const normalizedEmail = (reservation.clientEmail || "").trim().toLowerCase();
  const client = clients.find((c) => c.email.trim().toLowerCase() === normalizedEmail);
  if (client) {
    client.gastoTotal += delta;
    saveClients(clients);
  }

  return { reservation, fee: MODIFICATION_FEE, newTotal };
}

/* ---------- Cancelar una reserva (por el cliente) ----------
   Se llama desde la sección "Mis reservas". A diferencia de la cancelación
   que hace el admin (sin costo), aquí se cobra un cargo fijo de cancelación
   que se suma al total de la reserva y al gasto del cliente, y el vehículo
   vuelve a estar disponible en el stock. Devuelve { reservation, fee } o
   null si la reserva ya no se puede cancelar. */
const CANCELLATION_FEE = 20;

function cancelReservationByClient(id) {
  const reservations = getReservations();
  const reservation = reservations.find((r) => r.id === id);
  if (!reservation || reservation.status !== "en_curso") return null;

  reservation.status = "cancelado";
  reservation.extraFees = (reservation.extraFees || 0) + CANCELLATION_FEE;
  reservation.total += CANCELLATION_FEE;
  saveReservations(reservations);

  const vehicles = getVehicles();
  const v = vehicles.find((veh) => veh.id === reservation.vehicleId);
  if (v) v.stock += 1;
  saveVehicles(vehicles);

  const clients = getClients();
  const normalizedEmail = (reservation.clientEmail || "").trim().toLowerCase();
  const client = clients.find((c) => c.email.trim().toLowerCase() === normalizedEmail);
  if (client) {
    client.gastoTotal += CANCELLATION_FEE;
    saveClients(clients);
  }

  return { reservation, fee: CANCELLATION_FEE };
}
