// Variable para el historial de menús visitados en modo móvil
let menuHistory = ["main"];

// Seleccionar el botón de menú y asignar un evento de clic
document.getElementById("menuButton").addEventListener("click", openMenu);

// Abre un submenú
function openSubMenu(menuName, element) {
  if (window.innerWidth >= 768) {
    // Modo desktop: muestra las columnas en paralelo
    const columns = document.querySelectorAll(".menu-column");
    let showNextColumn = false;

    columns.forEach((column) => {
      if (showNextColumn) {
        column.classList.add("hidden");
      }
      if (column.dataset.menu === menuName) {
        column.classList.remove("hidden");
        showNextColumn = true;
      }
    });

    const targetSection = document.querySelector(`[data-menu="${menuName}"]`);
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Resetea el estilo seleccionado en la columna actual
    const currentColumn = element.closest(".menu-column");
    currentColumn.querySelectorAll("li").forEach(item => item.classList.remove("selected"));
    element.classList.add("selected");

  } else {
    // Modo móvil: reemplaza el menú actual con el submenú
    menuHistory.push(menuName);
    const targetSection = document.querySelector(`[data-menu="${menuName}"]`);

    // Oculta todos los menús y muestra solo el seleccionado
    document.querySelectorAll(".menu-column").forEach(column => column.classList.add("hidden"));
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Muestra el botón de "volver" en mobile
    document.getElementById("backButton").classList.remove("hidden");
  }
}

// Función para volver al menú anterior en modo móvil
function goBack() {
  if (menuHistory.length > 1) {
    menuHistory.pop(); // Quita el último menú visitado
    const previousMenu = menuHistory[menuHistory.length - 1];
    const targetSection = document.querySelector(`[data-menu="${previousMenu}"]`);

    // Oculta todos los menús y muestra solo el anterior
    document.querySelectorAll(".menu-column").forEach(column => column.classList.add("hidden"));
    if (targetSection) {
      targetSection.classList.remove("hidden");
    }

    // Oculta el botón de "volver" si estamos en el menú principal
    if (menuHistory.length === 1) {
      document.getElementById("backButton").classList.add("hidden");
    }
  }
}

// Función para cerrar el menú
function closeMenu() {
  document.getElementById("menu").classList.add("hidden");
}

// Función para abrir el menú
function openMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("hidden"); // Alterna la visibilidad del menú

  if (!menu.classList.contains("hidden")) {
    // Resetea el menú al principal y el historial para el modo móvil
    menuHistory = ["main"];

    // Oculta todas las columnas de menú y muestra solo la principal
    document.querySelectorAll(".menu-column").forEach(column => column.classList.add("hidden"));
    document.querySelector(`[data-menu="main"]`).classList.remove("hidden");

    // Oculta el botón de "volver" en caso de estar en modo móvil
    document.getElementById("backButton").classList.add("hidden");
  }
}

// Evento para ajustar el menú al cambiar el tamaño de la ventana
window.addEventListener('resize', () => {
  const menu = document.getElementById("menu");

  if (window.innerWidth >= 768) {
    // En modo desktop, muestra todas las columnas abiertas
    document.querySelectorAll(".menu-column").forEach(column => column.classList.remove("hidden"));
    document.getElementById("backButton").classList.add("hidden");
  } else if (!menu.classList.contains("hidden")) {
    // En modo móvil, muestra solo el menú principal al hacer resize
    openMenu();
  }
});
