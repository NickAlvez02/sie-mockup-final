const CONFIG_SIE = {
  whatsappPrincipal: "523339540617",
  mensajePrincipal: "Hola, me gustaría recibir información sobre los servicios de Corporativo SIE.",
  slides: [
    { imagen:"assets/banner1.jpeg", alt:"Promoción Aspel NOI", whatsapp:"523339540617", mensaje:"Hola, vi la promoción de Aspel NOI en la página de Corporativo SIE y me gustaría recibir más información." },
    { imagen:"assets/banner2.jpeg", alt:"Promoción Siigo ASPEL SAE", whatsapp:"523339540617", mensaje:"Hola, vi la promoción de Siigo ASPEL SAE en la página de Corporativo SIE y me gustaría recibir más información." },
    { imagen:"assets/banner3.jpeg", alt:"Promoción Siigo Fiscal", whatsapp:"523339540617", mensaje:"Hola, vi la promoción de Siigo Fiscal en la página de Corporativo SIE y me gustaría recibir más información." },
    { imagen:"assets/banner4.jpeg", alt:"Promoción Aspel COI", whatsapp:"523339540617", mensaje:"Hola, vi la promoción de Aspel COI en la página de Corporativo SIE y me gustaría recibir más información." },
    { imagen:"assets/banner5.jpeg", alt:"Cupón CONTPAQi 20%", whatsapp:"5213314162657", mensaje:"Hola, vi el cupón de CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información." },
    { imagen:"assets/banner6.jpeg", alt:"Promoción Suite Anual CONTPAQi", whatsapp:"5213314162657", mensaje:"Hola, vi la promoción de Suite Anual CONTPAQi en la página de Corporativo SIE y me gustaría recibir más información." }
  ]
};

function linkWhatsApp(numero, mensaje){
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

/* Carrusel */
(function initCarrusel(){
  const track = document.getElementById('carrusel-track');
  const indicadoresCont = document.getElementById('carrusel-indicadores');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  if(!track) return;

  let actual = 0, auto;

  let slidesActivos = CONFIG_SIE.slides;

  async function obtenerSlides(){
    try{
      const respuesta = await fetch('https://corporativosie.com.mx/web/Back/carrusel/get_carusel.php', { cache:'no-store' });
      if(!respuesta.ok) throw new Error('No se pudo consultar el carrusel');
      const datos = await respuesta.json();
      if(Array.isArray(datos) && datos.length){
        slidesActivos = datos.map((item, i) => ({
          imagen: item.imagen,
          alt: item.titulo || item.descripcion || `Promoción Corporativo SIE ${i+1}`,
          whatsapp: CONFIG_SIE.whatsappPrincipal,
          mensaje: `Hola, vi la promoción ${item.titulo || ''} en la página de Corporativo SIE y me gustaría recibir más información.`
        }));
      }
    }catch(error){
      console.info('Se usarán las promociones incluidas en el mockup.', error);
    }
  }

  function renderizarSlides(){
    track.innerHTML='';
    indicadoresCont.innerHTML='';
    slidesActivos.forEach((slide, index) => {
      const div = document.createElement('div');
      div.className = 'hero-slide';
      const img = document.createElement('img');
      img.src = slide.imagen; img.alt = slide.alt; img.loading = index === 0 ? 'eager' : 'lazy';
      if(index === 0) img.fetchPriority = 'high';
      div.appendChild(img);
      const wsp = document.createElement('a');
      wsp.className = 'hero-slide__whatsapp';
      wsp.href = linkWhatsApp(slide.whatsapp, slide.mensaje);
      wsp.target = '_blank'; wsp.rel = 'noopener';
      wsp.setAttribute('aria-label','Consultar promoción por WhatsApp');
      wsp.title = 'Consultar promoción';
      wsp.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.5 2 2 6.1 2 11.2c0 2 .7 3.9 1.9 5.5L2.5 22l5.5-1.4c1.3.6 2.7 1 4.2 1 5.5 0 10-4.1 10-9.4S17.5 2 12 2z"/></svg>`;
      div.appendChild(wsp);
      track.appendChild(div);

      const b = document.createElement('button');
      b.className = 'indicador' + (index===0 ? ' activo' : '');
      b.setAttribute('aria-label', `Ir a la promoción ${index+1}`);
      b.onclick = () => irASlide(index);
      indicadoresCont.appendChild(b);
    });
  }

  function actualizar(){
    track.style.transform = `translateX(-${actual*100}%)`;
    document.querySelectorAll('.hero__indicadores button').forEach((ind,i)=>ind.classList.toggle('activo', i===actual));
  }
  function moverSlide(dir){
    if(!slidesActivos.length) return;
    actual = (actual+dir+slidesActivos.length)%slidesActivos.length; actualizar(); reiniciarAuto();
  }
  function irASlide(i){ actual = i; actualizar(); reiniciarAuto(); }
  function reiniciarAuto(){
    clearInterval(auto);
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      auto = setInterval(()=>moverSlide(1), 6000);
    }
  }
  btnPrev.addEventListener('click', ()=>moverSlide(-1));
  btnNext.addEventListener('click', ()=>moverSlide(1));

  (async()=>{
    await obtenerSlides();
    renderizarSlides();
    actualizar();
    reiniciarAuto();
  })();
})();

/* Navbar: transición progresiva azul → blanco + menú móvil */
(function initNavbar(){
  const navbar = document.getElementById('navbar');
  const btnMenu = document.getElementById('btn-menu');
  if(!navbar) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function actualizarNavbar(){
    /* 0 = integrado con el Hero azul / 1 = navbar blanco.
       El recorrido de 150 px evita el cambio tipo interruptor. */
    const distancia = reduceMotion ? 60 : 150;
    const progreso = Math.max(0, Math.min(1, window.scrollY / distancia));
    const suavizado = progreso * progreso * (3 - 2 * progreso); // smoothstep
    /* La nueva cabecera es clara: iniciamos casi en modo blanco y terminamos sólido. */
    const progresoClaro = 0.82 + (0.18 * suavizado);
    navbar.style.setProperty('--nav-progress', progresoClaro.toFixed(4));
    ticking = false;
  }

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(actualizarNavbar);
      ticking = true;
    }
  }

  actualizarNavbar();
  window.addEventListener('scroll', onScroll, { passive:true });

  if(btnMenu){
    btnMenu.addEventListener('click', () => {
      const abierto = navbar.classList.toggle('menu-abierto');
      btnMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
    });
  }
  const navMovil = document.getElementById('nav-movil');
  if(navMovil){
    navMovil.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navbar.classList.remove('menu-abierto');
        if(btnMenu) btnMenu.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

/* Scroll reveal */
(function initReveal(){
  const elementos = document.querySelectorAll('.reveal');
  if(!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    elementos.forEach(el => el.classList.add('visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  elementos.forEach(el => observer.observe(el));
})();

/* CTA: los botones "Hablar con un asesor" llevan al bloque final */
(function initScrollAsesor(){
  const destino = document.getElementById('contacto');
  if(!destino) return;

  ['nav-asesor','hero-asesor','movil-asesor'].forEach(id => {
    const el = document.getElementById(id);
    if(!el) return;
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const reducirMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      destino.scrollIntoView({ behavior: reducirMovimiento ? 'auto' : 'smooth', block:'center' });
    });
  });
})();

/* WhatsApp directo: solamente desde el CTA final y el botón flotante */
(function initEnlacesWhatsApp(){
  const url = linkWhatsApp(CONFIG_SIE.whatsappPrincipal, CONFIG_SIE.mensajePrincipal);
  ['cta-whatsapp','fab-whatsapp'].forEach(id => {
    const el = document.getElementById(id);
    if(el){ el.href = url; el.target = '_blank'; el.rel = 'noopener'; }
  });
})();

/* Solicitud de consultoría: despliega el formulario y prepara el mensaje */
(function initConsultoria(){
  const boton = document.getElementById('btn-consultoria');
  const panel = document.getElementById('consultoria-panel');
  const form = document.getElementById('consultoria-form');
  if(!boton || !panel || !form) return;

  boton.addEventListener('click', () => {
    const abrir = !panel.classList.contains('abierto');
    panel.classList.toggle('abierto', abrir);
    boton.classList.toggle('abierto', abrir);
    boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    panel.setAttribute('aria-hidden', abrir ? 'false' : 'true');

    if(abrir){
      window.setTimeout(() => document.getElementById('consultoria-nombre')?.focus(), 280);
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('consultoria-nombre').value.trim();
    const empresa = document.getElementById('consultoria-empresa').value.trim();
    const necesidad = document.getElementById('consultoria-necesidad').value.trim();

    const mensaje = [
      'Hola, me gustaría solicitar una consultoría con Corporativo SIE.',
      '',
      `Nombre: ${nombre}`,
      empresa ? `Empresa: ${empresa}` : null,
      `Necesidad: ${necesidad}`
    ].filter(Boolean).join('\n');

    window.open(linkWhatsApp(CONFIG_SIE.whatsappPrincipal, mensaje), '_blank', 'noopener');
  });
})();

/* Servicios y soluciones: modal con video + detalle */
(function initSolucionesEspecializadas(){
  const modal = document.getElementById('solucion-modal');
  if(!modal) return;

  const titulo = document.getElementById('solucion-modal-titulo');
  const descripcion = document.getElementById('solucion-modal-descripcion');
  const modulos = document.getElementById('solucion-modal-modulos');
  const asesor = document.getElementById('solucion-modal-asesor');
  const whatsapp = document.getElementById('solucion-modal-whatsapp');
  const etiqueta = document.getElementById('solucion-modal-etiqueta');
  const player = document.getElementById('solucion-modal-player');
  const badge = document.getElementById('solucion-modal-video-badge');
  const note = document.getElementById('solucion-modal-video-note');

  const servicios = {
    contables:{etiqueta:'Servicio Corporativo SIE',titulo:'Servicios Contables',descripcion:'Ordena tu operación financiera, fiscal y administrativa con un servicio que te ayuda a tener más control, claridad y confianza en el día a día.',modulos:['Contabilidad','Facturación','Nómina','Impuestos','Reportes'],mensaje:'Hola, me interesa recibir información sobre los servicios contables de Corporativo SIE.'},
    soporte:{etiqueta:'Servicio Corporativo SIE',titulo:'Soporte Técnico',descripcion:'Recibe acompañamiento cercano para resolver dudas, incidencias o necesidades técnicas, sin frenar la operación de tu empresa.',modulos:['Atención remota','Diagnóstico','Actualizaciones','Acompañamiento','Implementación'],mensaje:'Hola, me interesa conocer más sobre el servicio de soporte técnico de Corporativo SIE.'},
    programacion:{etiqueta:'Servicio Corporativo SIE',titulo:'Programación a la medida',descripcion:'Desarrollamos soluciones pensadas para tu operación: sistemas, módulos o automatizaciones que simplifican procesos y te ayudan a crecer.',modulos:['Software a medida','Automatización','Integraciones','Apps web','Mejoras'],mensaje:'Hola, me interesa conocer más sobre el servicio de programación a la medida de Corporativo SIE.'},
    marketing:{etiqueta:'Servicio Corporativo SIE',titulo:'Diseño y Marketing',descripcion:'Haz que tu negocio comunique mejor su valor con diseño, identidad visual y apoyo digital pensado para atraer y conectar con más clientes.',modulos:['Branding','Diseño','Contenido','Redes sociales','Campañas'],mensaje:'Hola, me interesa conocer más sobre el servicio de diseño y marketing de Corporativo SIE.'},
    capacitacion:{etiqueta:'Servicio Corporativo SIE',titulo:'Capacitación',descripcion:'Capacita a tu equipo de forma práctica para que aproveche mejor sus herramientas, procesos y sistemas dentro de la empresa.',modulos:['Entrenamiento','Procesos','Herramientas','Productividad','Acompañamiento'],mensaje:'Hola, me interesa conocer más sobre el servicio de capacitación de Corporativo SIE.'},
    talleres:{etiqueta:'Servicio Corporativo SIE',titulo:'Talleres',descripcion:'Impulsa la innovación de tu empresa con talleres claros y aplicables, enfocados en mejora continua, tecnología y adopción de nuevas soluciones.',modulos:['Innovación','Tecnología','Equipos','Transformación','Aplicación práctica'],mensaje:'Hola, me interesa conocer más sobre los talleres de Corporativo SIE.'},

    hospitalario:{etiqueta:'Solución especializada',titulo:'CRM Hospitalario',descripcion:'Administra áreas, pacientes, medicamentos y pagos desde una sola solución, con información centralizada para facilitar el seguimiento operativo.',modulos:['Áreas','Pacientes','Medicamentos','Pagos','Seguimiento'],mensaje:'Hola, vi la solución CRM Hospitalario en su página y me gustaría recibir más información.'},
    contable:{etiqueta:'Solución especializada',titulo:'CRM Contable',descripcion:'Gestión integral de clientes con datos fiscales, seguimiento de soporte técnico y control comercial desde un solo lugar.',modulos:['Módulos','Soportes','Contabilidad','Ventas','Empleados','Prospectos','Marketing'],mensaje:'Hola, vi la solución CRM Contable en su página y me gustaría recibir más información.'},
    proveedores:{etiqueta:'Solución especializada',titulo:'CRM Pago a Proveedores',descripcion:'Organiza pagos, cuentas y proveedores para tener mayor visibilidad de compromisos, movimientos y seguimiento administrativo.',modulos:['Proveedores','Cuentas','Pagos','Seguimiento','Reportes'],mensaje:'Hola, vi la solución CRM Pago a Proveedores en su página y me gustaría recibir más información.'},
    prestamos:{etiqueta:'Solución especializada',titulo:'CRM de Préstamos',descripcion:'Centraliza clientes, préstamos, adeudos y movimientos para llevar un control más claro del proceso de financiamiento.',modulos:['Clientes','Préstamos','Adeudos','Pagos','Seguimiento'],mensaje:'Hola, vi la solución CRM de Préstamos en su página y me gustaría recibir más información.'},
    vehiculos:{etiqueta:'Solución especializada',titulo:'CRM Renta de Vehículos',descripcion:'Gestiona unidades, clientes, disponibilidad y rentas desde una sola herramienta para simplificar la operación diaria.',modulos:['Vehículos','Clientes','Rentas','Disponibilidad','Control'],mensaje:'Hola, vi la solución CRM Renta de Vehículos en su página y me gustaría recibir más información.'}
  };

  let current = null;

  function abrirPanelConsultoria(){
    const destino = document.getElementById('contacto');
    const boton = document.getElementById('btn-consultoria');
    const panel = document.getElementById('consultoria-panel');
    destino?.scrollIntoView({ behavior:'smooth', block:'center' });
    if(boton && panel && !panel.classList.contains('abierto')){
      setTimeout(() => boton.click(), 420);
    }
  }

  function abrir(key){
    const s = servicios[key];
    if(!s) return;
    current = key;
    if(etiqueta) etiqueta.textContent = s.etiqueta || 'Servicio Corporativo SIE';
    if(titulo) titulo.textContent = s.titulo;
    if(descripcion) descripcion.textContent = s.descripcion;
    if(modulos) modulos.innerHTML = (s.modulos || []).map(x => `<span>✓ ${x}</span>`).join('');
    if(whatsapp){
      whatsapp.href = linkWhatsApp(CONFIG_SIE.whatsappPrincipal, s.mensaje || `Hola, me interesa recibir más información sobre ${s.titulo}.`);
      whatsapp.target = '_blank';
      whatsapp.rel = 'noopener';
    }
    if(asesor){
      asesor.onclick = (e) => {
        e.preventDefault();
        cerrar();
        setTimeout(abrirPanelConsultoria, 180);
      };
    }
    if(badge) badge.textContent = 'Video corporativo';
    if(note) note.textContent = `Conoce de forma visual cómo ${s.titulo.toLowerCase()} puede ayudar a tu empresa.`;
    if(player){
      try{
        player.pause();
        player.currentTime = 0;
        player.load();
      }catch(error){/* noop */}
    }
    modal.classList.add('abierto');
    modal.setAttribute('aria-hidden','false');
    document.body.classList.add('modal-abierto');
  }

  function cerrar(){
    modal.classList.remove('abierto');
    modal.setAttribute('aria-hidden','true');
    document.body.classList.remove('modal-abierto');
    if(player){
      try{ player.pause(); }catch(error){/* noop */}
    }
  }

  document.querySelectorAll('.solucion-video-card').forEach(card => {
    card.addEventListener('click', () => abrir(card.dataset.solucion));
  });

  document.querySelectorAll('.ecosistema-item[data-servicio]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      abrir(item.dataset.servicio);
    });
  });

  modal.querySelectorAll('[data-cerrar-modal]').forEach(el => el.addEventListener('click', cerrar));
  document.addEventListener('keydown', e => { if(e.key === 'Escape' && modal.classList.contains('abierto')) cerrar(); });

  window.SIEModalServicios = { abrir, cerrar, get current(){ return current; } };
})();

/* SIE IA: los ejemplos rellenan el campo para invitar a interactuar */
(function initEjemplosIA(){
  const input = document.getElementById('sie-ia-input');
  if(!input) return;
  document.querySelectorAll('[data-pregunta-ia]').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.preguntaIa || btn.textContent.trim();
      input.focus();
      input.animate([
        { boxShadow:'0 0 0 0 rgba(68,178,223,0)' },
        { boxShadow:'0 0 0 5px rgba(68,178,223,.18)' },
        { boxShadow:'0 7px 18px rgba(17,42,66,.055)' }
      ], { duration:520, easing:'ease-out' });
    });
  });
})();


/* Ecosistema de servicios: interacción directa, sin rotación automática */
(function initEcosistemaServicios(){
  const orbita = document.querySelector('.ecosistema-orbita--ux');
  if(!orbita) return;

  const items = [...orbita.querySelectorAll('.ecosistema-item')];
  const centro = orbita.querySelector('.ecosistema-orbita__centro');
  const titulo = document.getElementById('ecosistema-centro-titulo');
  const descripcion = document.getElementById('ecosistema-centro-descripcion');
  const link = document.getElementById('ecosistema-centro-link');
  const base = { titulo:'Conoce nuestros servicios', descripcion:'Selecciona una opción', link:'#contacto' };
  let actual = null;

  function mostrar(item, fijar = false){
    if(fijar) actual = item;
    items.forEach(el => el.classList.toggle('is-active', el === item));
    const data = item ? {
      titulo:item.dataset.titulo,
      descripcion:item.dataset.descripcion || '',
      link:item.dataset.link || item.getAttribute('href')
    } : base;


    if(titulo) titulo.textContent = data.titulo;
    if(descripcion) descripcion.textContent = data.descripcion;
    if(link) link.href = data.link;
  }

  items.forEach(item => {
    item.addEventListener('pointerenter', () => mostrar(item));
    item.addEventListener('focus', () => mostrar(item));
    item.addEventListener('pointerdown', () => mostrar(item, true));
    item.addEventListener('pointerleave', () => { if(!actual || actual !== item) mostrar(actual); });
    item.addEventListener('blur', () => { if(!actual || actual !== item) mostrar(actual); });
  });

  if(link){
    link.addEventListener('click', (e) => {
      if(actual?.dataset?.servicio && window.SIEModalServicios){
        e.preventDefault();
        window.SIEModalServicios.abrir(actual.dataset.servicio);
      }
    });
  }

  mostrar(null);
})();

/* Soluciones a medida: despliegue inline sin superponer contenido */
(function initSolucionesMedidaInline(){
  const btn = document.getElementById('toggle-soluciones-medida');
  const extra = document.getElementById('soluciones-medida-extra');
  if(!btn || !extra) return;

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', open ? 'false' : 'true');
    extra.classList.toggle('is-open', !open);
    extra.setAttribute('aria-hidden', open ? 'true' : 'false');
    const label = btn.querySelector('span:first-child');
    if(label) label.textContent = open ? 'Ver más soluciones' : 'Ver menos';
  });
})();


/* V40 — SIE IA demo interactiva */
(function initSieIADemo(){
  const input = document.getElementById('sie-ia-input');
  const sendBtn = document.getElementById('sie-ia-send');
  const body = document.getElementById('sie-ia-chat-body');
  const form = document.getElementById('sie-ia-form');
  if(!input || !sendBtn || !body || !form) return;

  const avatar = `
    <div class="ia-chat__miniavatar" aria-hidden="true">
      <svg viewBox="0 0 48 48" fill="none"><defs><linearGradient id="botBlueMiniLive" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse"><stop stop-color="#3DBDF5"/><stop offset="1" stop-color="#0D8DDB"/></linearGradient></defs><rect x="8" y="12" width="32" height="24" rx="12" fill="url(#botBlueMiniLive)"/><circle cx="18" cy="24" r="2.1" fill="white"/><circle cx="30" cy="24" r="2.1" fill="white"/><path d="M18 29c1.4 1.8 3.6 2.8 6 2.8s4.6-1 6-2.8" stroke="white" stroke-width="2.1" stroke-linecap="round"/></svg>
    </div>`;

  function responder(texto){
    const t = texto.toLowerCase();
    if(t.includes('factur') && t.includes('invent')) return 'Te conviene revisar opciones de facturación con control comercial e inventario, como CONTPAQi o Siigo Aspel.';
    if(t.includes('factur') || t.includes('cfdi')) return 'Para facturación y timbrado puedo orientarte a CONTPAQi Factura electrónica o CFDI en línea.';
    if(t.includes('invent')) return 'Para inventario y operación comercial, puedo mostrarte soluciones de control y administración más prácticas.';
    if(t.includes('soporte') || t.includes('técnico') || t.includes('tecnico')) return 'Podemos canalizarte con soporte técnico y acompañamiento especializado de Corporativo SIE.';
    if(t.includes('medida') || t.includes('crm') || t.includes('desarrollo')) return 'Si buscas algo más específico, te puedo guiar hacia nuestros desarrollos a la medida y soluciones CRM.';
    if(t.includes('compara')) return 'Sí. Puedo ayudarte a comparar opciones por tipo de operación, funciones y enfoque de tu empresa.';
    return 'Puedo ayudarte a ubicar la solución ideal según si necesitas facturar, controlar inventario, recibir soporte o desarrollar un sistema a la medida.';
  }

  function addUser(texto){
    const item = document.createElement('div');
    item.className = 'ia-chat__mensaje ia-chat__mensaje--usuario';
    item.innerHTML = `<div class="ia-chat__burbuja"></div>`;
    item.querySelector('.ia-chat__burbuja').textContent = texto;
    body.appendChild(item);
  }

  function addAssistant(texto){
    const item = document.createElement('div');
    item.className = 'ia-chat__mensaje ia-chat__mensaje--ia';
    item.innerHTML = `${avatar}<div class="ia-chat__burbuja"></div>`;
    item.querySelector('.ia-chat__burbuja').textContent = texto;
    body.appendChild(item);
  }

  function scrollEnd(){
    body.scrollTop = body.scrollHeight;
  }

  function sendCurrent(){
    const texto = input.value.trim();
    if(!texto) return;
    addUser(texto);
    input.value = '';
    scrollEnd();
    setTimeout(() => {
      addAssistant(responder(texto));
      scrollEnd();
    }, 300);
  }

  sendBtn.addEventListener('click', sendCurrent);
  form.addEventListener('submit', (e) => { e.preventDefault(); sendCurrent(); });
  input.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
      e.preventDefault();
      sendCurrent();
    }
  });

  document.querySelectorAll('[data-pregunta-ia]').forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.preguntaIa || btn.textContent.trim();
      input.focus();
    });
  });
})();
