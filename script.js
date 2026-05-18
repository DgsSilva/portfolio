// Abas de projetos
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// Dark / Light Mode
const toggleBtn = document.getElementById('toggle-theme');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';
});

// Scroll suave para links de navegação
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Copiar email
const copyBtn = document.getElementById('copy-email');
const emailText = document.getElementById('email-text');

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(emailText.textContent);

  copyBtn.textContent = 'Copiado!';
  copyBtn.setAttribute('aria-live', 'polite');
  
  setTimeout(() => {
    copyBtn.textContent = 'Copiar';
  }, 2000);
});

// Menu mobile toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
});

// Fechar ao clicar no overlay
overlay.addEventListener('click', () => {
  menuToggle.classList.remove('active');
  navLinks.classList.remove('active');
  overlay.classList.remove('active');
});

// Fechar ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
  });
});

// Atualiza aria-expanded
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !expanded);
});

// fechar com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    overlay.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

// Seleciona o botão e todos os cards da experiência
const btnVerMais = document.getElementById('btn-ver-mais');
const experienceCards = document.querySelectorAll('#experience-cards .md-card');

// Define quantos cards mostrar inicialmente
const cardsVisiveis = 3;

btnVerMais.addEventListener('click', () => {
  // Verifica se algum card está oculto
  const hiddenCards = Array.from(experienceCards).filter(card => card.classList.contains('hidden'));

  if (hiddenCards.length > 0) {
    // Mostrar todos os cards ocultos
    hiddenCards.forEach(card => card.classList.remove('hidden'));
    btnVerMais.textContent = 'Ver menos';
  } else {
    // Ocultar novamente os extras (mantendo apenas os primeiros visíveis)
    experienceCards.forEach((card, index) => {
      if (index >= cardsVisiveis) {
        card.classList.add('hidden');
      }
    });
    btnVerMais.textContent = 'Ver mais';
  }
});

// BOTÕES SEÇÃO DE PROJETOS — cada aba controla apenas seus próprios cards ocultos
document.querySelectorAll('.tab-content').forEach(tab => {
  const btnWrapper = tab.querySelector('.btn-wrapper');
  if (!btnWrapper) return;

  const btn = btnWrapper.querySelector('button');
  if (!btn) return;

  const hiddenCards = Array.from(tab.querySelectorAll('.hidden-card'));
  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;
    hiddenCards.forEach(card => {
      card.style.display = expanded ? 'block' : 'none';
    });
    btn.textContent = expanded ? 'Ver menos' : 'Ver mais';
  });
});

// Modal de projetos
const projectModal = document.getElementById('project-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('project-modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const modalDots = document.getElementById('modal-dots');
const projectPrevBtn = document.getElementById('project-prev');
const projectNextBtn = document.getElementById('project-next');

let currentGallery = [];
let currentIndex = 0;
let currentProjectCards = [];
let currentProjectIndex = 0;

function updateModal() {
  const imageUrl = currentGallery[currentIndex];
  modalImage.src = imageUrl;
  modalImage.alt = modalTitle.textContent;

  modalPrev.disabled = currentGallery.length <= 1;
  modalNext.disabled = currentGallery.length <= 1;

  modalDots.innerHTML = currentGallery.map((_, index) => {
    return `<button type="button" class="${index === currentIndex ? 'active' : ''}" data-index="${index}" aria-label="Ir para imagem ${index + 1}"></button>`;
  }).join('');

  modalDots.querySelectorAll('button').forEach(dot => {
    dot.addEventListener('click', () => {
      currentIndex = Number(dot.dataset.index);
      updateModal();
    });
  });
}

function updateProjectNavigation() {
  if (!currentProjectCards.length) return;
  projectPrevBtn.disabled = currentProjectIndex <= 0;
  projectNextBtn.disabled = currentProjectIndex >= currentProjectCards.length - 1;
}

function openProjectModal(images, title, description, projectCards = [], projectIndex = 0) {
  currentGallery = images;
  currentIndex = 0;
  currentProjectCards = projectCards;
  currentProjectIndex = projectIndex;
  modalTitle.textContent = title;
  modalDescription.textContent = description;
  projectModal.classList.add('active');
  projectModal.removeAttribute('hidden');
  updateModal();
  updateProjectNavigation();
}

function closeProjectModal() {
  projectModal.classList.remove('active');
  projectModal.setAttribute('hidden', '');
}

modalClose.addEventListener('click', closeProjectModal);
modalBackdrop.addEventListener('click', closeProjectModal);
modalPrev.addEventListener('click', () => {
  if (currentGallery.length <= 1) return;
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateModal();
});
modalNext.addEventListener('click', () => {
  if (currentGallery.length <= 1) return;
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateModal();
});

function changeProject(direction) {
  const nextIndex = currentProjectIndex + direction;
  if (nextIndex < 0 || nextIndex >= currentProjectCards.length) return;

  const card = currentProjectCards[nextIndex];
  if (!card) return;

  const img = card.querySelector('img');
  if (!img) return;

  const gallery = img.dataset.gallery
    ? img.dataset.gallery.split(',').map(path => path.trim()).filter(Boolean)
    : [img.src];
  const title = card.querySelector('h3')?.textContent || '';
  const description = card.querySelector('p')?.textContent || '';

  openProjectModal(gallery, title, description, currentProjectCards, nextIndex);
}

projectPrevBtn.addEventListener('click', () => changeProject(-1));
projectNextBtn.addEventListener('click', () => changeProject(1));

document.querySelectorAll('#projetos .card button.btn.primary').forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    const card = btn.closest('.card');
    if (!card) return;
    const activeTab = document.querySelector('.tab-content.active');
    const projectCards = activeTab ? Array.from(activeTab.querySelectorAll('.card')) : Array.from(document.querySelectorAll('#projetos .card'));
    const currentProjectIndex = projectCards.indexOf(card);
    const img = card.querySelector('img');
    if (!img) return;
    const gallery = img.dataset.gallery
      ? img.dataset.gallery.split(',').map(path => path.trim()).filter(Boolean)
      : [img.src];
    const title = card.querySelector('h3')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    openProjectModal(gallery, title, description, projectCards, currentProjectIndex);
  });
});

document.querySelectorAll('#projetos .card').forEach(card => {
  card.addEventListener('click', (event) => {
    if (event.target.closest('a, button')) return;
    const link = card.querySelector('a.btn.primary');
    if (link) {
      const target = link.target || '_self';
      window.open(link.href, target);
      return;
    }
    const button = card.querySelector('button.btn.primary');
    if (button) {
      button.click();
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});


// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      const offset = 80; // ajuste se seu header for fixo
      const topPosition = target.offsetTop - offset;

      window.scrollTo({
        top: topPosition,
        behavior: 'smooth'
      });
    }
  });
});

