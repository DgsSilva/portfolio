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

//BOTÕES SEÇÃO DE PROJETOS


  const btn = document.getElementById('toggleBtn');
  const hiddenCards = document.querySelectorAll('.hidden-card');

  let expanded = false;

  btn.addEventListener('click', () => {
    expanded = !expanded;

    hiddenCards.forEach(card => {
      card.style.display = expanded ? 'block' : 'none';
    });

    btn.textContent = expanded ? 'Ver menos' : 'Ver mais';
  });

  const btn2 = document.getElementById('toggleBtn2');
  const hiddenCards2 = document.querySelectorAll('.hidden-card');

  let expanded2 = false;

  btn2.addEventListener('click', () => {
    expanded2 = !expanded2;

    hiddenCards2.forEach(card => {
      card.style.display = expanded2 ? 'block' : 'none';
    });

    btn2.textContent = expanded2 ? 'Ver menos' : 'Ver mais';
  });

  const btn3 = document.getElementById('toggleBtn3');
  const hiddenCards3 = document.querySelectorAll('.hidden-card');

  let expanded3 = false;

  btn3.addEventListener('click', () => {
    expanded3 = !expanded3;

    hiddenCards3.forEach(card => {
      card.style.display = expanded3 ? 'block' : 'none';
    });

    btn3.textContent = expanded3 ? 'Ver menos' : 'Ver mais';
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
