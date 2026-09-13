/* Cargador ligero: aplica el ajuste responsive móvil y conserva la lógica original. */
(function(){
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'mobile-fix.css?v=1';
  document.head.appendChild(css);

  const original = document.createElement('script');
  original.src = 'script-original.js?v=1';
  original.async = false;
  document.body.appendChild(original);
})();
