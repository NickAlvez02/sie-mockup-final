(function initContpaqi(){
  if(!document.body.classList.contains('pagina-contpaqi')) return;

  const WHATSAPP = '523339540617';

  const promos = [
    {file:'anticipa.jpg', label:'Anticipa', message:'Hola, vi la promoción Anticipa de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'optimiza.jpg', label:'Optimiza', message:'Hola, vi la promoción Optimiza de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'anticipa-optimiza.jpg', label:'Anticipa y Optimiza', message:'Hola, vi la promoción Anticipa y Optimiza de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'migracion-40.jpg', label:'Migración', message:'Hola, vi la promoción de Migración de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información.'},
    {file:'suite-anual.jpg', label:'Suite Anual', message:'Hola, vi la promoción de Suite Anual de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información.'}
  ].map(promo => ({
    ...promo,
    image:`assets/contpaqi/promos/${promo.file}`
  }));

  const categories = [
    {
      key:'contables',
      number:'01',
      label:'Contables',
      items:[
        {name:'Contabilidad', subtitle:'Integra y controla tus procesos contables, fiscales y financieros.', logo:'assets/contpaqi/current/contabilidad.png', description:'Integra y controla tus procesos contables, fiscales y financieros con información organizada para tomar mejores decisiones.', chips:['Contabilidad','Fiscal','Finanzas']},
        {name:'Nóminas', subtitle:'Administra tu nómina y cumple a tiempo con tus obligaciones.', logo:'assets/contpaqi/current/nominas.png', description:'Administra tu nómina y da seguimiento a las obligaciones relacionadas con tus colaboradores de forma más sencilla.', chips:['Nómina','Colaboradores','Cumplimiento']},
        {name:'Bancos', subtitle:'Controla cuentas, ingresos, egresos y flujo de efectivo.', logo:'assets/contpaqi/current/bancos.png', description:'Facilita la administración de tus cuentas y flujo de efectivo con control de ingresos y egresos.', chips:['Bancos','Flujo de efectivo','Movimientos']},
        {name:'XML en línea+', subtitle:'Busca y descarga CFDI del SAT de forma automatizada.', logo:'assets/contpaqi/current/xml.png', description:'Busca y descarga de forma automatizada y masiva los CFDI del portal del SAT.', chips:['XML','CFDI','SAT']}
      ]
    },
    {
      key:'comerciales',
      number:'02',
      label:'Comerciales',
      items:[
        {name:'Factura electrónica', subtitle:'Automatiza y agiliza tu proceso de facturación.', logo:'assets/contpaqi/current/factura.png', description:'Automatiza y hace más eficiente tu proceso de facturación para mantener tu operación comercial en orden.', chips:['Facturación','CFDI','Ventas']},
        {name:'CFDI Facturación', subtitle:'Emite y timbra CFDI por internet de forma sencilla.', logo:'assets/contpaqi/current/cfdi.png', description:'Facilita la emisión y timbrado de tus CFDI por internet con un flujo sencillo y accesible.', chips:['CFDI','Timbrado','Internet']},
        {name:'Comercial', subtitle:'Integra y organiza tus actividades comerciales.', logo:'assets/contpaqi/current/comercial.png', description:'Integra y planifica tus actividades comerciales para mantener mayor control de clientes, ventas y operación.', chips:['Comercial','Clientes','Ventas']},
        {name:'Producción', subtitle:'Controla recursos y procesos productivos de tu empresa.', logo:'assets/contpaqi/current/produccion.png', description:'Controla y administra recursos y procesos de producción y fabricación de tu empresa.', chips:['Producción','Recursos','Procesos']}
      ]
    },
    {
      key:'nube',
      number:'03',
      label:'Nube',
      items:[
        {name:'Decide', subtitle:'Consulta reportes personalizados y datos en tiempo real.', logo:'assets/contpaqi/current/decide.png', description:'Consulta reportes personalizados y datos en tiempo real para tomar mejores decisiones para tu negocio.', chips:['Reportes','Indicadores','Decisiones']},
        {name:'Timbra', subtitle:'Timbrado masivo de CFDI para operaciones de alto volumen.', logo:'assets/contpaqi/current/timbra.png', description:'Servicio de timbrado masivo de CFDI para empresas que necesitan automatizar procesos de facturación.', chips:['Timbrado','CFDI','Automatización']},
        {name:'Vende', subtitle:'Genera facturas y administra documentos y cuentas por cobrar.', logo:'assets/contpaqi/current/vende.png', description:'Realiza el proceso de facturación electrónica y administra documentos emitidos y cuentas por cobrar.', chips:['Ventas','Facturas','Cobranza']},
        {name:'Viáticos', subtitle:'Gestiona gastos y viáticos desde la nube.', logo:'assets/contpaqi/current/viaticos.png', description:'Gestiona gastos y viáticos desde la nube, incluyendo diferentes formas de pago y gastos en efectivo.', chips:['Viáticos','Gastos','Nube']},
        {name:'QR', subtitle:'Agiliza el intercambio de información fiscal mediante códigos QR.', logo:'assets/contpaqi/current/qr.png', description:'Automatiza el intercambio de información fiscal entre clientes y empresas mediante códigos QR.', chips:['QR','Fiscal','Facturación']},
        {name:'Personia', subtitle:'Administra operaciones de nómina desde cualquier lugar.', logo:'assets/contpaqi/current/personia.png', description:'Controla, automatiza y administra operaciones de nómina desde cualquier lugar y en todo momento.', chips:['Nómina','Capital humano','Nube']},
        {name:'Cobra', subtitle:'Gestiona cuentas por cobrar y seguimiento de clientes.', logo:'assets/contpaqi/current/cobra.png', description:'Da seguimiento a tus cuentas por cobrar y mantén mayor visibilidad de compromisos y clientes.', chips:['Cobranza','Clientes','Seguimiento']},
        {name:'Colabora', subtitle:'Facilita procesos de nómina y recursos humanos.', logo:'assets/contpaqi/current/colabora.png', description:'Facilita al equipo de nómina la gestión de procesos de recursos humanos y colaboración.', chips:['RH','Nómina','Colaboración']},
        {name:'Contabiliza', subtitle:'Lleva tu contabilidad en la nube con visibilidad de tus datos.', logo:'assets/contpaqi/current/contabiliza.png', description:'Lleva tu contabilidad en la nube con mayor control y visibilidad de tu información contable.', chips:['Contabilidad','Nube','Control']},
        {name:'Escritorio Virtual', subtitle:'Accede a tu escritorio desde cualquier dispositivo.', logo:'assets/contpaqi/current/virtual.png', description:'Accede al escritorio de tu computadora desde cualquier dispositivo, lugar y momento.', chips:['Remoto','Acceso','Continuidad']},
        {name:'Respaldos', subtitle:'Resguarda en la nube tus sistemas y archivos.', logo:'assets/contpaqi/current/respaldos.png', description:'Sube, administra y resguarda en la nube la información de tus sistemas CONTPAQi y archivos importantes.', chips:['Respaldo','Nube','Seguridad']}
      ]
    }
  ];

  const certs = [
    {name:'Comercial Premium', img:'assets/contpaqi/certs/comercial-premium.png', desc:'Certificación especializada en CONTPAQi Comercial Premium.'},
    {name:'Contabilidad', img:'assets/contpaqi/certs/contabilidad.png', desc:'Profesionales certificados en CONTPAQi Contabilidad.'},
    {name:'Factura electrónica', img:'assets/contpaqi/certs/factura-electronica.png', desc:'Implementación y soporte certificado en factura electrónica.'},
    {name:'Nóminas', img:'assets/contpaqi/certs/nominas.png', desc:'Conocimiento especializado para la gestión de nómina.'},
    {name:'Personia Nube', img:'assets/contpaqi/certs/personia-nube.png', desc:'Especialización en soluciones de capital humano en la nube.'},
    {name:'Siigo Nube', img:'assets/contpaqi/certs/siigo-nube.png', desc:'Experiencia en implementación y uso de Siigo en la nube.'},
    {name:'Vende', img:'assets/contpaqi/certs/vende.png', desc:'Especialistas certificados en CONTPAQi Vende.'},
    {name:'Vende acreditación', img:'assets/contpaqi/certs/vende-acreditacion.png', desc:'Acreditación que respalda el dominio de CONTPAQi Vende.'}
  ];

  function wa(message){
    return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
  }

  // WhatsApp global
  ['cta-whatsapp','fab-whatsapp'].forEach(id => {
    const el = document.getElementById(id);
    if(el){
      el.href = wa('Hola, me interesa conocer las soluciones CONTPAQi que ofrece Corporativo SIE.');
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
      'Hola, me gustaría recibir información sobre soluciones CONTPAQi.',
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

  // Carrusel principal de promociones CONTPAQi
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
        <img src="${promo.image}" alt="Promoción ${promo.label} de CONTPAQi" loading="${i===0?'eager':'lazy'}">
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
          <span class="cpq-product-card__brand">CONTPAQi®</span>
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
    modalWhats.href=wa(`Hola, me interesa recibir información sobre ${item.name} de CONTPAQi.`);
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

  // Certifications marquee: duplicated for seamless movement
  const certTrack=document.getElementById('cpq-certs-track');
  if(certTrack){
    const doubled=[...certs,...certs];
    certTrack.innerHTML=doubled.map(cert=>`
      <article class="cpq-cert-card">
        <div class="cpq-cert-card__visual">
          <img src="${cert.img}" alt="${cert.name}">
        </div>
        <div class="cpq-cert-card__body">
          <strong>${cert.name}</strong>
          <p>${cert.desc}</p>
        </div>
      </article>
    `).join('');
  }

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