(function () {
  'use strict';

  const grid = document.getElementById('sale-grid');
  const filter = document.getElementById('sale-filter');
  if (!grid || !KWT.saleCatalog) return;

  function render(items) {
    grid.innerHTML = items.map(item => KWTProducts.renderCard(item, 'продажа')).join('');
    KWTProducts.bindOrderButtons(grid, 'продажа');
    if (window.kwtObserveReveal) window.kwtObserveReveal(grid.querySelectorAll('.reveal'));
  }

  render(KWT.saleCatalog);

  if (filter) {
    filter.addEventListener('click', e => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;
      filter.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('filter-btn--active'));
      btn.classList.add('filter-btn--active');
      const type = btn.dataset.filter;
      const items = type === 'all'
        ? KWT.saleCatalog
        : KWT.saleCatalog.filter(i => i.type === type);
      render(items);
    });
  }
})();
