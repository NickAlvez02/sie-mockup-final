(function initSiigoAspel(){
  if(!document.body.classList.contains('pagina-siigo-aspel')) return;

  const WHATSAPP = '523339540617';

  const promos = [
    {file:'banner2.jpeg', label:'Siigo ASPEL SAE', message:'Hola, vi la promoción de Siigo ASPEL SAE en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'banner1.jpeg', label:'Aspel NOI', message:'Hola, vi la promoción de Aspel NOI en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'banner4.jpeg', label:'Aspel COI', message:'Hola, vi la promoción de Aspel COI en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'banner3.jpeg', label:'Siigo Fiscal', message:'Hola, vi la promoción de Siigo Fiscal en la página de Corporativo SIE y me gustaría recibir más información.'}
  ].map(promo => ({
    ...promo,
    image:`assets/${promo.file}`
  }));

  const categories = [
    {
      key:'administracion',
      number:'01',
      label:'Administración',
      items:[
        {name:'Aspel SAE', subtitle:'Ventas, compras e inventarios de tu empresa.', logo:'assets/siigo-aspel/sae.png', description:'Administra ventas, compras, inventarios y cuentas por cobrar y pagar, con reportes para dar seguimiento a tu operación comercial.', chips:['Ventas','Inventarios','Compras']},
        {name:'Aspel CAJA', subtitle:'Punto de venta ágil para mostrador.', logo:'assets/siigo-aspel/caja.png', description:'Punto de venta pensado para negocios de mostrador: cobra rápido, controla existencias y emite tus comprobantes.', chips:['Punto de venta','Cobro','Existencias']},
        {name:'Aspel ADM', subtitle:'Administración para pequeños negocios.', logo:'assets/siigo-aspel/adm.png', description:'Una opción más ligera para administrar ventas e inventarios en negocios pequeños que están comenzando a ordenar su operación.', chips:['Administración','Ventas','Pequeños negocios']},
        {name:'Aspel ADM Tienda', subtitle:'Pensado para tiendas y mostrador.', logo:'assets/siigo-aspel/adm-tienda.png', description:'Variante de Aspel ADM enfocada en la operación diaria de una tienda: ventas de mostrador, inventario y cortes de caja.', chips:['Tiendas','Mostrador','Inventario']}
      ]
    },
    {
      key:'contabilidad-nomina',
      number:'02',
      label:'Contabilidad y nómina',
      items:[
        {name:'Aspel COI', subtitle:'Contabilidad general y estados financieros.', logo:'assets/siigo-aspel/coi.png', description:'Lleva tu contabilidad, genera pólizas y obtén estados financieros para conocer la situación real de tu empresa.', chips:['Contabilidad','Pólizas','Fiscal']},
        {name:'Aspel NOI', subtitle:'Cálculo de nómina y cumplimiento laboral.', logo:'assets/siigo-aspel/noi.png', description:'Calcula nómina, timbra recibos y da seguimiento a las obligaciones laborales de tus colaboradores.', chips:['Nómina','Timbrado','Colaboradores']},
        {name:'Aspel BANCO', subtitle:'Conciliación y control de tus cuentas.', logo:'assets/siigo-aspel/banco.png', description:'Controla el flujo de efectivo, movimientos bancarios y conciliaciones para tener mayor claridad de tus finanzas.', chips:['Bancos','Conciliación','Flujo']},
        {name:'Conta Asistente', subtitle:'Apoyo con IA para tu contabilidad.', logo:'assets/siigo-aspel/conta-asistente.png', description:'Un asistente que apoya el registro y seguimiento contable, pensado para agilizar tareas repetitivas del día a día.', chips:['Asistente','Contabilidad','Automatización']},
        {name:'NOI Asistente', subtitle:'Apoyo con IA para tu nómina.', logo:'assets/siigo-aspel/noi-asistente.png', description:'Un asistente enfocado en agilizar procesos de nómina y resolver dudas frecuentes de tus colaboradores.', chips:['Asistente','Nómina','Automatización']}
      ]
    },
    {
      key:'nube-facturacion',
      number:'03',
      label:'Nube y facturación',
      items:[
        {name:'Siigo Nube Facturación', subtitle:'Factura electrónica desde cualquier lugar.', logo:'assets/siigo-aspel/siigo-facturacion.png', description:'Emite y organiza tu facturación electrónica desde la nube, con acceso desde cualquier lugar y dispositivo.', chips:['Nube','CFDI','Facturación']},
        {name:'Siigo Nube Gestión', subtitle:'Administra ventas y clientes en la nube.', logo:'assets/siigo-aspel/siigo-gestion.png', description:'Gestiona ventas, clientes y operación comercial desde una plataforma en la nube, sin depender de un solo equipo.', chips:['Nube','Ventas','Clientes']},
        {name:'Aspel FACTURE', subtitle:'Facturación electrónica de escritorio.', logo:'assets/siigo-aspel/facture.png', description:'Emite comprobantes fiscales digitales de forma sencilla desde tu equipo, integrado con tus demás sistemas Aspel.', chips:['CFDI','Facturación','Escritorio']},
        {name:'Aspel PROD', subtitle:'Control de procesos de producción.', logo:'assets/siigo-aspel/prod.png', description:'Administra materiales, órdenes de producción y procesos de manufactura de tu empresa.', chips:['Producción','Materiales','Procesos']},
        {name:'Servidor Virtual', subtitle:'Accede a tus sistemas desde cualquier lugar.', logo:'assets/siigo-aspel/servidor-virtual.png', description:'Accede a tus sistemas Aspel desde cualquier dispositivo con conexión, sin depender de un solo equipo físico.', chips:['Remoto','Acceso','Continuidad']}
      ]
    }
  ];

  function wa(message){
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  }

  // WhatsApp global
  ['cta-whatsapp','fab-whatsapp'].forEach(id => {
    const el = document.getElementById(id);
    if(el){
      el.href = wa('Hola, me interesa conocer las soluciones Siigo Aspel que ofrece Corporativo SIE.');
      el.target = '_blank';
      el.rel = 'noopener';
    }
  });

  // Navbar mobile
  const navbar = document.getElementById('navbar');
  const menuBtn = document.getElementById('btn-menu');
  if(navbar && menuBtn){
    navbar.style.setProperty('--nav-progress','1');
    menuBtn.addEventListener('click', () => {
      const open = navbar.classList.toggle('menu-abierto');
      menuBtn.setAttribute('aria-expanded', open ? 'true':'false');
    });
  }

  // Consultation form
  const consultaBtn = document.getElementById('btn-consultoria');
  const consultaPanel = document.getElementById('consultoria-panel');
  const consultaForm = document.getElementById('consultoria-form');
  if(consultaBtn && consultaPanel){
    consultaBtn.addEventListener('click', () => {
      const open = !consultaPanel.classList.contains('abierto');
      consultaPanel.classList.toggle('abierto',open);
      consultaBtn.setAttribute('aria-expanded', open ? 'true':'false');
      consultaPanel.setAttribute('aria-hidden', open ? 'false':'true');
    });
  }
  consultaForm?.addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('consultoria-nombre').value.trim();
    const empresa = document.getElementById('consultoria-empresa').value.trim();
    const necesidad = document.getElementById('consultoria-necesidad').value.trim();
    const lines = [
      'Hola, me gustaría recibir información sobre soluciones Siigo Aspel.',
      `Nombre: ${nombre}`,
      empresa ? `Empresa: ${empresa}` : null,
      `Necesidad: ${necesidad}`
    ].filter(Boolean);
    window.open(wa(lines.join('\n')),'_blank','noopener');
  });

  // Category quick links
  document.querySelectorAll('[data-category-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      selectCategory(btn.dataset.categoryJump);
      document.getElementById('soluciones-contpaqi')?.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  // Carrusel principal de promociones Siigo Aspel
  const heroPromoTrack = document.getElementById('cpq-hero-promo-track');
  const heroPromoDots = document.getElementById('cpq-hero-promo-dots');
  const heroPromoPrev = document.getElementById('cpq-hero-promo-prev');
  const heroPromoNext = document.getElementById('cpq-hero-promo-next');
  let heroPromoIndex = 0;
  let heroPromoTimer = null;

  function renderHeroPromos(){
    if(!heroPromoTrack || !heroPromoDots) return;
    heroPromoTrack.innerHTML = promos.map((promo,i)=>`
      <article class="cpq-hero-promo-slide" aria-label="${promo.label}">
        <img src="${promo.image}" alt="Promoción ${promo.label}" loading="${i===0?'eager':'lazy'}">
        <a class="cpq-hero-promo-whatsapp" href="${wa(promo.message)}" target="_blank" rel="noopener" aria-label="Consultar por WhatsApp la promoción ${promo.label}">
          <span class="cpq-hero-promo-whatsapp__icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2 .7 3.9 1.9 5.5L2.5 22l5.5-1.4c1.3.6 2.7 1 4.2 1 5.5 0 10-4.1 10-9.4S17.5 2 12 2z"/></svg>
          </span>
          <span>Consultar oferta</span>
        </a>
      </article>
    `).join('');

    heroPromoDots.innerHTML = promos.map((_,i)=>`
      <button type="button" class="${i===heroPromoIndex?'is-active':''}" aria-label="Ver promoción ${i+1}" data-index="${i}"></button>
    `).join('');

    heroPromoDots.querySelectorAll('button').forEach(btn=>{
      btn.addEventListener('click',()=>{
        heroPromoIndex=Number(btn.dataset.index);
        updateHeroPromos();
        restartHeroPromoTimer();
      });
    });
    updateHeroPromos();
  }

  function updateHeroPromos(){
    if(!heroPromoTrack || !heroPromoDots) return;
    heroPromoTrack.style.transform=`translateX(-${heroPromoIndex*100}%)`;
    heroPromoDots.querySelectorAll('button').forEach((dot,i)=>dot.classList.toggle('is-active',i===heroPromoIndex));
  }

  function goHeroPromo(step){
    heroPromoIndex=(heroPromoIndex+step+promos.length)%promos.length;
    updateHeroPromos();
  }

  function restartHeroPromoTimer(){
    clearInterval(heroPromoTimer);
    heroPromoTimer=setInterval(()=>goHeroPromo(1),6500);
  }

  heroPromoPrev?.addEventListener('click',()=>{goHeroPromo(-1);restartHeroPromoTimer();});
  heroPromoNext?.addEventListener('click',()=>{goHeroPromo(1);restartHeroPromoTimer();});
  heroPromoTrack?.addEventListener('mouseenter',()=>clearInterval(heroPromoTimer));
  heroPromoTrack?.addEventListener('mouseleave',restartHeroPromoTimer);

  // Solutions
  const tabs = document.getElementById('cpq-category-tabs');
  const grid = document.getElementById('cpq-product-grid');
  let activeCategory = categories[0];

  function renderTabs(){
    if(!tabs) return;
    tabs.innerHTML = categories.map(c=>`
      <button type="button" role="tab" aria-selected="${c.key===activeCategory.key}" class="${c.key===activeCategory.key?'is-active':''}" data-category="${c.key}">
        <span>${c.number}</span>
        <strong>${c.label}</strong>
        <i aria-hidden="true">→</i>
      </button>
    `).join('');
    tabs.querySelectorAll('button').forEach(btn=>btn.addEventListener('click',()=>selectCategory(btn.dataset.category)));
  }

  function selectCategory(key){
    const found=categories.find(c=>c.key===key);
    if(!found) return;
    activeCategory=found;
    renderTabs();
    renderCategory();
  }

  function renderCategory(){
    grid.innerHTML=activeCategory.items.map((item,i)=>`
      <button type="button" class="cpq-product-card" data-item="${i}">
        <span class="cpq-product-card__logo"><img src="${item.logo}" alt="${item.name}"></span>
        <span class="cpq-product-card__copy">
          <span class="cpq-product-card__brand">${item.name.startsWith('Siigo') ? 'Siigo' : item.name.startsWith('Aspel') ? 'Aspel' : 'Siigo Aspel'}</span>
          <strong>${item.name}</strong>
          <small>${item.subtitle}</small>
        </span>
        <span class="cpq-product-card__arrow">→</span>
      </button>
    `).join('');
    grid.querySelectorAll('.cpq-product-card').forEach(btn=>btn.addEventListener('click',()=>{
      const item=activeCategory.items[Number(btn.dataset.item)];
      openProduct(item);
    }));
  }

  // Modal product
  const modal=document.getElementById('cpq-product-modal');
  const modalClose=document.getElementById('cpq-modal-close');
  const modalMediaLogo=document.getElementById('cpq-modal-media-logo');
  const modalCategory=document.getElementById('cpq-modal-category');
  const modalLogo=document.getElementById('cpq-modal-logo');
  const modalTitle=document.getElementById('cpq-modal-title');
  const modalSubtitle=document.getElementById('cpq-modal-subtitle');
  const modalDescription=document.getElementById('cpq-modal-description');
  const modalChips=document.getElementById('cpq-modal-chips');
  const modalWhats=document.getElementById('cpq-modal-whatsapp');
  const modalInfo=document.getElementById('cpq-modal-info');

  function openProduct(item){
    if(!modal) return;
    modalCategory.textContent=activeCategory.label;
    modalLogo.src=item.logo;
    modalLogo.alt=item.name;
    if(modalMediaLogo){ modalMediaLogo.src=item.logo; modalMediaLogo.alt=''; }
    modalTitle.textContent=item.name;
    modalSubtitle.textContent=item.subtitle;
    modalDescription.textContent=item.description;
    modalChips.innerHTML=item.chips.map(c=>`<span>${c}</span>`).join('');
    modalWhats.href=wa(`Hola, me interesa recibir información sobre ${item.name}.`);
    modalWhats.target='_blank';
    modalWhats.rel='noopener';
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-open');
  }

  function closeProduct(){
    if(!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-open');
  }
  modalClose?.addEventListener('click',closeProduct);
  modal?.querySelector('[data-close-product-modal]')?.addEventListener('click',closeProduct);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal?.classList.contains('is-open'))closeProduct();});
  modalInfo?.addEventListener('click',closeProduct);

  renderHeroPromos();
  restartHeroPromoTimer();
  renderTabs();
  renderCategory();

  // Reveal
  const revealEls=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}
  }),{threshold:.08});
  revealEls.forEach(el=>io.observe(el));
})();
