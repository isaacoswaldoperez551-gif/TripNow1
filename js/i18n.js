/* ---------- Sistema de idioma (ES/EN) ---------- */
const LANG_KEY = "tripnow_lang";

const translations = {
  es: {
    nav_inicio: "Inicio",
    nav_catalogo: "Catálogo",
    nav_sucursales: "Sucursales",
    nav_reservas: "Mis reservas",
    cart_link: "Carrito",
    login_btn: "Iniciar sesión",
    logout_btn: "Salir",
    auth_title: "Iniciar sesión",
    auth_subtitle: "Ingresa tus datos para identificarte en Trip Now.",
    auth_submit: "Ingresar",
    auth_hint: "Demo: no se requiere contraseña, solo tu correo para identificarte como cliente.",
    admin_link: "Administración",
    footer_tagline: "Arrendamiento de vehículos · El Salvador",
    footer_rights: "Todos los derechos reservados.",

    hero_eyebrow: "Arrendamiento de vehículos",
    hero_title_1: "Muévete cuando",
    hero_title_em: "tú decidas.",
    hero_lead:
      "Camionetas, sedanes, motocicletas e híbridos, listos para retirar en cualquiera de nuestras sucursales en El Salvador. Reserva en minutos, paga por día y cancela con reglas claras.",
    cta_catalog: "Ver catálogo",
    cta_branches: "Ver sucursales",
    personalize_intro: "Cuéntanos un poco de ti para personalizar tu experiencia.",
    ph_name: "Nombre completo",
    ph_email: "Correo electrónico",
    ph_phone: "Teléfono",
    btn_start: "Comenzar",
    confirm_desc:
      "Ya personalizamos tu experiencia. Explora el catálogo para ver los vehículos disponibles cerca de ti.",
    greeting_thanks: "Gracias,",
    greeting_again: "Hola de nuevo,",
    vp1_title: "Reserva en minutos",
    vp1_desc: "Elige tu vehículo, define los días de uso y confirma sin filas ni papeleo.",
    vp2_title: "Precio transparente",
    vp2_desc: "El total se calcula al momento según los días exactos que necesites.",
    vp3_title: "Sucursales en todo el país",
    vp3_desc: "Retira y devuelve en la ubicación que más te convenga.",

    catalog_title: "Catálogo de arrendamiento",
    catalog_loading: "Cargando vehículos disponibles…",
    pill_all: "Todos",
    pill_pickup: "Camioneta",
    pill_sedan: "Sedán",
    pill_suv: "SUV",
    pill_moto: "Motocicleta",
    pill_compact: "Compacto",
    label_transmission: "Transmisión",
    label_fuel: "Combustible",
    label_min_passengers: "Pasajeros mín.",
    opt_all: "Todos",
    opt_auto: "Automático",
    opt_manual: "Manual",
    opt_gas: "Gasolina",
    opt_electric: "Eléctrico",
    opt_hybrid: "Híbrido",

    spec_transmission: "Transmisión",
    spec_fuel: "Combustible",
    spec_passengers: "Pasajeros",
    spec_available: "Disponibles",
    days_label: "Días",
    per_day: "/día",
    btn_add_cart: "Agregar al carrito",
    btn_unavailable: "No disponible",
    added_check: "Agregado ✓",
    badge_out_of_stock: "Sin stock",
    result_count_one: "vehículo disponible",
    result_count_many: "vehículos disponibles",
    result_count_suffix: "según tu búsqueda.",
    empty_catalog:
      "No hay vehículos que coincidan con estos filtros. Prueba ajustando el tipo de vehículo o la capacidad de pasajeros.",

    cart_title: "Tu carrito",
    cart_loading: "Cargando…",
    cart_empty_subtitle: "Tu carrito está vacío.",
    cart_empty_state: "Aún no has agregado vehículos.",
    go_catalog: "Ir al catálogo",
    summary_vehicles: "Vehículos",
    summary_total: "Total",
    btn_confirm_purchase: "Confirmar compra",
    cart_note: "Confirma la fecha y la sucursal para reservar tus vehículos.",
    day_singular: "vehículo seleccionado.",
    day_plural: "vehículos seleccionados.",
    day_unit_singular: "día",
    day_unit_plural: "días",
    btn_remove: "Quitar",
    label_pickup_date: "Fecha de recogida",
    label_pickup_branch: "Sucursal de entrega",
    label_return_date: "Devolución",
    opt_select_branch: "Selecciona una sucursal",
    alert_missing_schedule: "Elige la fecha de recogida y la sucursal antes de confirmar.",
    alert_date_past: "La fecha de recogida no puede ser anterior a hoy.",

    branches_title: "Nuestras sucursales",
    branches_intro: "Retira y devuelve tu vehículo en la ubicación más cercana a ti.",

    myres_title: "Mis reservas",
    myres_loading: "Cargando…",
    myres_login_required: "Inicia sesión para ver tus reservas.",
    myres_login_btn: "Iniciar sesión",
    myres_empty: "Todavía no tienes reservas. Explora el catálogo para arrendar tu primer vehículo.",
    myres_subtitle_one: "reserva encontrada.",
    myres_subtitle_many: "reservas encontradas.",
    myres_field_days: "Días",
    myres_modify_btn: "Modificar reserva",
    myres_cancel_edit_btn: "Cancelar",
    myres_save_btn: "Guardar cambios",
    myres_fee_notice: "Modificar esta reserva tiene un costo adicional de $15, que se sumará al total.",
    myres_fee_paid_label: "Cargos por cambios",
    myres_alert_success_1: "Reserva actualizada. Se agregó un cargo de $",
    myres_alert_success_2: " por el cambio. Nuevo total: $",
    myres_cancel_btn: "Cancelar reserva",
    myres_cancel_confirm: "¿Cancelar esta reserva? Se cobrará un cargo de cancelación de $20 aunque no se use el vehículo. ¿Deseas continuar?",
    myres_cancel_alert_1: "Reserva cancelada. Se cobró un cargo de cancelación de $",
    myres_cancel_alert_2: ".",
    myres_status_en_curso: "En curso",
    myres_status_finalizado: "Finalizado",
    myres_status_cancelado: "Cancelado",

    prompt_name: "Antes de confirmar, ¿cuál es tu nombre completo?",
    prompt_email: "¿Y tu correo electrónico?",
    alert_out_of_stock:
      "Uno de los vehículos de tu carrito ya no tiene unidades disponibles. Revisa el carrito e inténtalo de nuevo.",
    alert_confirmed_1: "¡Reserva confirmada por $",
    alert_confirmed_2: "! Ya quedó registrada a nombre de ",
    alert_confirmed_3: ". Puedes ver el estado de tu viaje en el panel de administración.",
  },
  en: {
    nav_inicio: "Home",
    nav_catalogo: "Catalog",
    nav_sucursales: "Branches",
    nav_reservas: "My bookings",
    cart_link: "Cart",
    login_btn: "Log in",
    logout_btn: "Log out",
    auth_title: "Log in",
    auth_subtitle: "Enter your details to identify yourself with Trip Now.",
    auth_submit: "Log in",
    auth_hint: "Demo: no password needed, just your email to identify you as a customer.",
    admin_link: "Admin",
    footer_tagline: "Vehicle rental · El Salvador",
    footer_rights: "All rights reserved.",

    hero_eyebrow: "Vehicle rental",
    hero_title_1: "Move whenever",
    hero_title_em: "you decide.",
    hero_lead:
      "Pickups, sedans, motorcycles and hybrids, ready to pick up at any of our branches across El Salvador. Book in minutes, pay by the day, and cancel with clear rules.",
    cta_catalog: "View catalog",
    cta_branches: "View branches",
    personalize_intro: "Tell us a bit about yourself to personalize your experience.",
    ph_name: "Full name",
    ph_email: "Email address",
    ph_phone: "Phone",
    btn_start: "Get started",
    confirm_desc:
      "We've personalized your experience. Explore the catalog to see the vehicles available near you.",
    greeting_thanks: "Thanks,",
    greeting_again: "Welcome back,",
    vp1_title: "Book in minutes",
    vp1_desc: "Pick your vehicle, set the number of days, and confirm with no lines or paperwork.",
    vp2_title: "Transparent pricing",
    vp2_desc: "The total is calculated instantly based on the exact days you need.",
    vp3_title: "Branches nationwide",
    vp3_desc: "Pick up and return at whichever location works best for you.",

    catalog_title: "Rental catalog",
    catalog_loading: "Loading available vehicles…",
    pill_all: "All",
    pill_pickup: "Pickup truck",
    pill_sedan: "Sedan",
    pill_suv: "SUV",
    pill_moto: "Motorcycle",
    pill_compact: "Compact",
    label_transmission: "Transmission",
    label_fuel: "Fuel",
    label_min_passengers: "Min. passengers",
    opt_all: "All",
    opt_auto: "Automatic",
    opt_manual: "Manual",
    opt_gas: "Gasoline",
    opt_electric: "Electric",
    opt_hybrid: "Hybrid",

    spec_transmission: "Transmission",
    spec_fuel: "Fuel",
    spec_passengers: "Passengers",
    spec_available: "Available",
    days_label: "Days",
    per_day: "/day",
    btn_add_cart: "Add to cart",
    btn_unavailable: "Unavailable",
    added_check: "Added ✓",
    badge_out_of_stock: "Out of stock",
    result_count_one: "vehicle available",
    result_count_many: "vehicles available",
    result_count_suffix: "matching your search.",
    empty_catalog:
      "No vehicles match these filters. Try adjusting the vehicle type or passenger capacity.",

    cart_title: "Your cart",
    cart_loading: "Loading…",
    cart_empty_subtitle: "Your cart is empty.",
    cart_empty_state: "You haven't added any vehicles yet.",
    go_catalog: "Go to catalog",
    summary_vehicles: "Vehicles",
    summary_total: "Total",
    btn_confirm_purchase: "Confirm booking",
    cart_note: "Confirm the date and branch to book your vehicles.",
    day_singular: "vehicle selected.",
    day_plural: "vehicles selected.",
    day_unit_singular: "day",
    day_unit_plural: "days",
    btn_remove: "Remove",
    label_pickup_date: "Pickup date",
    label_pickup_branch: "Pickup branch",
    label_return_date: "Return date",
    opt_select_branch: "Select a branch",
    alert_missing_schedule: "Choose a pickup date and branch before confirming.",
    alert_date_past: "The pickup date can't be earlier than today.",

    branches_title: "Our branches",
    branches_intro: "Pick up and return your vehicle at the location closest to you.",

    myres_title: "My bookings",
    myres_loading: "Loading…",
    myres_login_required: "Log in to see your bookings.",
    myres_login_btn: "Log in",
    myres_empty: "You don't have any bookings yet. Browse the catalog to rent your first vehicle.",
    myres_subtitle_one: "booking found.",
    myres_subtitle_many: "bookings found.",
    myres_field_days: "Days",
    myres_modify_btn: "Modify booking",
    myres_cancel_edit_btn: "Cancel",
    myres_save_btn: "Save changes",
    myres_fee_notice: "Modifying this booking has an extra cost of $15, added to the total.",
    myres_fee_paid_label: "Modification fees",
    myres_alert_success_1: "Booking updated. A $",
    myres_alert_success_2: " fee was added for the change. New total: $",
    myres_cancel_btn: "Cancel booking",
    myres_cancel_confirm: "Cancel this booking? A $20 cancellation fee will be charged even though the vehicle won't be used. Continue?",
    myres_cancel_alert_1: "Booking cancelled. A $",
    myres_cancel_alert_2: " cancellation fee was charged.",
    myres_status_en_curso: "In progress",
    myres_status_finalizado: "Completed",
    myres_status_cancelado: "Cancelled",

    prompt_name: "Before confirming, what is your full name?",
    prompt_email: "And your email address?",
    alert_out_of_stock:
      "One of the vehicles in your cart is no longer available. Please check your cart and try again.",
    alert_confirmed_1: "Booking confirmed for $",
    alert_confirmed_2: "! It has been registered under the name of ",
    alert_confirmed_3: ". You can check your trip's status in the admin panel.",
  },
};

// Traducciones de los VALORES que vienen de data.js (siempre guardados en
// español, para no romper los filtros). Solo cambia lo que se muestra.
const VALUE_LABELS = {
  Camioneta: { es: "Camioneta", en: "Pickup truck" },
  Sedán: { es: "Sedán", en: "Sedan" },
  SUV: { es: "SUV", en: "SUV" },
  Motocicleta: { es: "Motocicleta", en: "Motorcycle" },
  Compacto: { es: "Compacto", en: "Compact" },
  Automático: { es: "Automático", en: "Automatic" },
  Manual: { es: "Manual", en: "Manual" },
  Gasolina: { es: "Gasolina", en: "Gasoline" },
  Eléctrico: { es: "Eléctrico", en: "Electric" },
  Híbrido: { es: "Híbrido", en: "Hybrid" },
};

function getLang() {
  return localStorage.getItem(LANG_KEY) || "es";
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function t(key) {
  const lang = getLang();
  return (translations[lang] && translations[lang][key]) || translations.es[key] || key;
}

// Traduce un valor que viene tal cual de data.js (ej. v.type, v.fuel)
function valueLabel(value) {
  const lang = getLang();
  return (VALUE_LABELS[value] && VALUE_LABELS[value][lang]) || value;
}

function applyTranslations() {
  document.documentElement.lang = getLang() === "en" ? "en" : "es";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
  });

  const langBtn = document.getElementById("langBtn");
  if (langBtn) langBtn.textContent = getLang().toUpperCase();
}

// Cada página puede definir window.onLangChange para re-renderizar
// contenido dinámico (tarjetas de catálogo, carrito, etc.) tras el cambio.
function initLangToggle() {
  applyTranslations();
  const langBtn = document.getElementById("langBtn");
  if (!langBtn) return;
  langBtn.addEventListener("click", () => {
    setLang(getLang() === "es" ? "en" : "es");
    applyTranslations();
    if (typeof window.onLangChange === "function") window.onLangChange();
  });
}
