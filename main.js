/* ============================================
   Francesco Zini — main.js
   Vanilla JS: nav, reveal, modal video, filtri guida
   ============================================ */

(() => {
  'use strict';

  /* ---------- Year footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar scroll state ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 30) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile burger ---------- */
  const burger = document.getElementById('navBurger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      links.classList.toggle('is-open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        burger.classList.remove('is-open');
        links.classList.remove('is-open');
      })
    );
  }

  /* ---------- Reveal on scroll (Intersection Observer) ---------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Magnetic buttons (subtle pull on hover) ---------- */
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });

  /* ---------- Modal Video (YouTube) ---------- */
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  function openVideo(ytId) {
    if (!modal || !ytId) return;
    // TODO: sostituisci 'dQw4w9WgXcQ' con i veri YouTube ID dei video nelle card sotto
    modalVideo.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    modalVideo.innerHTML = '';
    document.body.style.overflow = '';
  }
  if (modal) {
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeVideo));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeVideo(); });
  }

  // YouTube cards (homepage)
  document.querySelectorAll('.yt__thumb').forEach(t => {
    t.addEventListener('click', () => openVideo(t.dataset.yt));
  });

  /* ============================================
     SEZIONE GUIDA — DATI + FILTRI
     Sostituisci youtubeId con i veri ID dei video.
     Le immagini sono in assets/images/ — sostituiscile a piacere.
     ============================================ */

  const restaurants = [
    {
      nome: "Sorbillo",
      citta: "Napoli",
      cucina: "Pizza",
      prezzo: 1,
      rating: 5,
      image: "assets/images/pizza.jpg",
      youtubeId: "dQw4w9WgXcQ", // TODO: ID video reale
      maps: "https://maps.google.com/?q=Sorbillo+Napoli",
      nota: "La pizza più chiacchierata di Napoli vale ancora la coda? Spoiler: sì, ma solo se ti piace l'impasto soffice come un cuscino."
    },
    {
      nome: "Trattoria Mario",
      citta: "Firenze",
      cucina: "Tradizionale",
      prezzo: 2,
      rating: 5,
      image: "assets/images/bistecca.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Trattoria+Mario+Firenze",
      nota: "Una bistecca alla fiorentina come si deve. Zero fronzoli, solo carne, fuoco e una vista sui cuochi che sembra teatro."
    },
    {
      nome: "Trapizzino",
      citta: "Roma",
      cucina: "Street Food",
      prezzo: 1,
      rating: 4,
      image: "assets/images/streetfood.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Trapizzino+Roma",
      nota: "Il triangolino di pizza ripieno che ha cambiato lo street food romano. A 5€ ti porti a casa la cena. E un sorriso."
    },
    {
      nome: "Piazza Duomo",
      citta: "Bologna",
      cucina: "Gourmet",
      prezzo: 3,
      rating: 5,
      image: "assets/images/gourmet.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Piazza+Duomo+Bologna",
      nota: "Tre stelle Michelin meritate. Ogni piatto è una micro-narrazione. Il conto fa male, ma il ricordo dura un anno."
    },
    {
      nome: "Antica Pesa",
      citta: "Roma",
      cucina: "Tradizionale",
      prezzo: 3,
      rating: 4,
      image: "assets/images/pasta.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Antica+Pesa+Roma",
      nota: "Cucina romana classica in versione raffinata. La carbonara qui la fanno come Dio comanda — niente panna, niente discussioni."
    },
    {
      nome: "Da Cesare al Casaletto",
      citta: "Roma",
      cucina: "Tradizionale",
      prezzo: 2,
      rating: 5,
      image: "assets/images/trattoria.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Cesare+Casaletto+Roma",
      nota: "La trattoria che vorresti sotto casa. Tovaglie a quadri, prezzi onesti, e un'amatriciana che ti rimette al mondo."
    },
    {
      nome: "Bottega Sicula",
      citta: "Palermo",
      cucina: "Street Food",
      prezzo: 1,
      rating: 4,
      image: "assets/images/sicilian.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Bottega+Sicula+Palermo",
      nota: "Arancini, cannoli e tutto quello che dovresti mangiare a Palermo almeno una volta nella vita. Possibilmente in piedi."
    },
    {
      nome: "Il Luogo di Aimo e Nadia",
      citta: "Milano",
      cucina: "Gourmet",
      prezzo: 3,
      rating: 5,
      image: "assets/images/gourmet.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Aimo+Nadia+Milano",
      nota: "Storia, ricerca, materia prima impeccabile. Milano sa essere gourmet senza essere fredda — qui c'è la prova."
    },
    {
      nome: "Pizzeria Gino Sorbillo",
      citta: "Milano",
      cucina: "Pizza",
      prezzo: 1,
      rating: 4,
      image: "assets/images/pizza.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Sorbillo+Milano",
      nota: "Napoli a Milano. L'impasto regge il viaggio, il pomodoro pure. Promosso, ma la versione di casa resta superiore."
    },
    {
      nome: "Trattoria della Posta",
      citta: "Torino",
      cucina: "Tradizionale",
      prezzo: 2,
      rating: 4,
      image: "assets/images/pasta.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Trattoria+Posta+Torino",
      nota: "Plin, agnolotti, brasato al Barolo. La cucina piemontese fatta come si deve, in un locale che profuma di legno e tempo."
    },
    {
      nome: "Da Vittorio",
      citta: "Bologna",
      cucina: "Pesce",
      prezzo: 3,
      rating: 5,
      image: "assets/images/gourmet.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Da+Vittorio+Bologna",
      nota: "Tre stelle, materia prima d'altri pianeti. I paccheri al pomodoro qui sono un'esperienza spirituale."
    },
    {
      nome: "Friggitoria Vomero",
      citta: "Napoli",
      cucina: "Street Food",
      prezzo: 1,
      rating: 4,
      image: "assets/images/streetfood.jpg",
      youtubeId: "dQw4w9WgXcQ",
      maps: "https://maps.google.com/?q=Friggitoria+Vomero+Napoli",
      nota: "Cuoppo di frittura caldissimo in un cono di carta. Cinque euro di felicità. E dopo, tre giorni di rimorsi."
    }
  ];

  const grid = document.getElementById('grid');
  const empty = document.getElementById('empty');
  const countEl = document.getElementById('count');
  const fCitta = document.getElementById('fCitta');
  const fCucina = document.getElementById('fCucina');
  const fPrezzo = document.getElementById('fPrezzo');
  const fSort = document.getElementById('fSort');
  const resetBtn = document.getElementById('resetFilters');

  if (!grid) return; // pagina home, fine

  function priceSymbol(p) { return '€'.repeat(p); }
  function ratingHtml(r) {
    let out = '';
    for (let i = 1; i <= 5; i++) {
      out += `<span class="${i <= r ? '' : 'off'}">🍴</span>`;
    }
    return out;
  }

  function cardHtml(r) {
    return `
      <article class="card" data-citta="${r.citta}" data-cucina="${r.cucina}" data-prezzo="${r.prezzo}" data-rating="${r.rating}">
        <div class="card__media">
          <img src="${r.image}" alt="${r.nome}" loading="lazy" />
          <span class="card__price">${priceSymbol(r.prezzo)}</span>
          <button class="card__play-btn" data-yt="${r.youtubeId}">Guarda il video</button>
        </div>
        <div class="card__body">
          <span class="card__tag">${r.cucina}</span>
          <h3 class="card__title">${r.nome}</h3>
          <span class="card__city">${r.citta}</span>
          <div class="card__rating" aria-label="Voto ${r.rating} su 5">${ratingHtml(r.rating)}</div>
          <p class="card__note">"${r.nota}"</p>
          <div class="card__footer">
            <a href="${r.maps}" target="_blank" rel="noopener" class="card__map">Vedi su Mappa →</a>
          </div>
        </div>
      </article>
    `;
  }

  function render(list) {
    grid.innerHTML = list.map(cardHtml).join('');
    countEl.textContent = list.length;
    empty.hidden = list.length > 0;
    // Attach video handlers to new buttons
    grid.querySelectorAll('.card__play-btn').forEach(b => {
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        openVideo(b.dataset.yt);
      });
    });
  }

  function applyFilters() {
    const c = fCitta.value;
    const cu = fCucina.value;
    const p = fPrezzo.value;
    const s = fSort.value;

    let list = restaurants.filter(r =>
      (!c || r.citta === c) &&
      (!cu || r.cucina === cu) &&
      (!p || r.prezzo === Number(p))
    );

    if (s === 'rating-desc') list.sort((a, b) => b.rating - a.rating);
    else if (s === 'rating-asc') list.sort((a, b) => a.rating - b.rating);

    // Fade-out current, then render new
    const cards = grid.querySelectorAll('.card');
    if (cards.length) {
      cards.forEach(c => c.classList.add('hide'));
      setTimeout(() => render(list), 220);
    } else {
      render(list);
    }
  }

  // Initial render (with brief skeleton)
  setTimeout(() => render(restaurants), 500);

  [fCitta, fCucina, fPrezzo, fSort].forEach(el => el.addEventListener('change', applyFilters));
  resetBtn.addEventListener('click', () => {
    fCitta.value = ''; fCucina.value = ''; fPrezzo.value = ''; fSort.value = 'default';
    applyFilters();
  });

})();
