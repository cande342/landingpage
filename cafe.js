document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const searchInput = document.querySelector('.search-box input');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuSections = document.querySelectorAll('.menu-section');
  const menuItems = document.querySelectorAll('.menu-item');

  let activeCategory = 'Todos';

  // Función principal de filtrado
  function filterMenu() {
    const searchTerm = searchInput.value.toLowerCase().trim();

    menuSections.forEach(section => {
      let visibleItemsInSection = 0;
      const sectionCategory = section.dataset.category;

      const items = section.querySelectorAll('.menu-item');
      items.forEach(item => {
        const title = item.querySelector('.item-title').textContent.toLowerCase();
        const desc = item.querySelector('.item-desc').textContent.toLowerCase();
        const tags = Array.from(item.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');

        // Coincidencia por texto (título, descripción o etiquetas)
        const matchesSearch = title.includes(searchTerm) || desc.includes(searchTerm) || tags.includes(searchTerm);
        
        // Coincidencia por categoría seleccionada
        const matchesCategory = (activeCategory === 'Todos') || (sectionCategory === activeCategory);

        if (matchesSearch && matchesCategory) {
          item.style.display = 'flex';
          visibleItemsInSection++;
        } else {
          item.style.display = 'none';
        }
      });

      // Si una sección no tiene ítems visibles, se oculta el título de la sección
      if (visibleItemsInSection > 0) {
        section.style.display = 'block';
      } else {
        section.style.display = 'none';
      }
    });
  }

  // Evento: Escribir en el Buscador
  searchInput.addEventListener('input', filterMenu);

  // Evento: Clic en Botones de Categoría
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Cambiar estado visual del botón activo
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Actualizar categoría activa y filtrar
      activeCategory = button.textContent.trim();
      filterMenu();
    });
  });
});