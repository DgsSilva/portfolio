const btnPDF = document.getElementById('btn-curriculo');

btnPDF.addEventListener('click', () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const primary = [40, 40, 40];
  const accent = [70, 130, 180];

  // ===== BASE64 DA IMAGEM =====
  // ⚠️ COLE AQUI A BASE64 COMPLETA (sem cortar)
  const imgBase64 = "data:images/jpeg;base64,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";

  // ===== SIDEBAR =====
  doc.setFillColor(...primary);
  doc.rect(0, 0, 65, 297, 'F');

  // ===== FOTO =====
  try {
    doc.addImage(imgBase64, 'JPEG', 12.5, 10, 40, 40);
  } catch (e) {
    console.warn('Erro ao carregar imagem base64:', e);
  }

  // ===== NOME =====
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Douglas Silva', 10, 60);

  // ===== SUBTÍTULO =====
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(200);
  doc.text('Artista 2D', 10, 68);
  doc.text('Pixel Artist', 10, 74);
  doc.text('UX/UI Designer', 10, 80);

  // Linha decorativa
  doc.setDrawColor(...accent);
  doc.setLineWidth(1);
  doc.line(10, 85, 55, 85);

  let yLeft = 95;

  // ===== SOBRE =====
  doc.setFontSize(12);
  doc.setTextColor(255);
  doc.text('Sobre', 10, yLeft);

  yLeft += 6;

  doc.setFontSize(9);
  doc.setTextColor(220);
  doc.text(
`Designer UI/UX com cerca de 5 anos de experiência.
Atuação como artista 2D com foco em pixel art,
sprites e animações.`,
    10,
    yLeft,
    { maxWidth: 45 }
  );

  yLeft += 25;

  // divisor
  doc.setDrawColor(100);
  doc.setLineWidth(0.2);
  doc.line(10, yLeft, 55, yLeft);
  yLeft += 6;

  // ===== HABILIDADES =====
  doc.setFontSize(12);
  doc.setTextColor(255);
  doc.text('Habilidades', 10, yLeft);

  yLeft += 6;

  doc.setFontSize(9);
  doc.setTextColor(220);
  doc.text(
`Figma 
Miro 
Clip Studio Paint 
Photoshop 
Illustrator 
Aseprite 
Blender 3D 
Adobe Premiere 
After Effects 
Krita 
Indesign 
CorelDraw 
Excel 
Word 
PowerPoint`,
    10,
    yLeft
  );

  yLeft += 62;

  // divisor
  doc.line(10, yLeft, 55, yLeft);
  yLeft += 6;

  // ===== IDIOMAS =====
  doc.setFontSize(12);
  doc.setTextColor(255);
  doc.text('Idiomas', 10, yLeft);

  yLeft += 6;

  doc.setFontSize(9);
  doc.setTextColor(220);
  doc.text(
`Português: Nativo
Inglês: Intermediário`,
    10,
    yLeft
  );

  // ===== COLUNA DIREITA =====
  doc.setTextColor(0, 0, 0);

  let yRight = 20;

  // ===== EXPERIÊNCIA =====
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(...accent);
  doc.text('Experiência', 75, yRight);

  doc.setDrawColor(...accent);
  doc.setLineWidth(0.5);
  doc.line(75, yRight + 2, 190, yRight + 2);

  yRight += 12;

  const exp = [
    {
      title: 'Artista 2D/Animador 2D e UI/UX Designer',
      company: 'Rebuild! Gam Studio',
      desc: `Nov de 2024 - Atualmente · Fortaleza, CE, Brasil

Trabalho nos vários jogos do estúdio Rebuild, fazendo concept art dos personagens, sprites e animações em Pixel Art, e também trabalho como UI/UX Designer de alguns projetos.`
    },
    {
      title: 'UI/UX Designer',
      company: 'GREat',
      desc: `Out de 2019 - Jan de 2020 · Fortaleza, CE, Brasil

Trabalhei no projeto Saúde Digital do Idoso, um projeto de acompanhamento da saúde da pessoa idosa. Projetei fluxos e interfaces interativas, além de ter criado a logo para o App.`
    },
    {
      title: 'Ilustrador e UI/UX designer',
      company: 'LME | UFC',
      desc: `Jun de 2018 - Set de 2019 · Fortaleza, CE, Brasil

Trabalhei como Ilustrador e UI/UX Designer no desenvolvimento de Recursos Educacionais Digitais (REDs). Criei interfaces, fluxos, elementos de UI, além de alguns personagens para os recursos.`
    },
    {
      title: 'UI/UX designer e Artista 2D',
      company: 'Apple Developer Academy | IFCE',
      desc: `Fev de 2016 - Dez de 2017 · Fortaleza, CE, Brasil

Trabalhei como UI/UX Designer na maioria dos times de desenvolvimento de aplicativos da empresa, criando interfaces e seus fluxos, além de logotipos para os apps. Também trabalhei como animador 2D e Character Design nos jogos que eram produzidos no projeto.`
    },
    {
      title: 'UI/UX Designer',
      company: 'LIT | IFCE',
      desc: `Jan de 2015 - Jan de 2016 · Fortaleza, CE, Brasil

Trabalhei no laboratório LIT desenvolvendo animações 2D para um jogo, e como UI/UX Designer para uma aplicação de catálogo eletrônico para tablet, criando fluxos e interfaces.`
    }
  ];

  exp.forEach(item => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(0);
    doc.text(item.title, 75, yRight);

    yRight += 5;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(item.company, 75, yRight);

    yRight += 5;

    doc.setFontSize(9);
    doc.setTextColor(50);
    doc.text(item.desc, 75, yRight, { maxWidth: 120 });

    yRight += 18 + (item.desc.split('\n').length * 3);
  });

  // ===== EDUCAÇÃO =====
doc.setFont('helvetica', 'bold');
doc.setFontSize(16);
doc.setTextColor(...accent);
doc.text('Educação', 75, yRight);

doc.setDrawColor(...accent);
doc.setLineWidth(0.5);
doc.line(75, yRight + 2, 190, yRight + 2);

yRight += 12;

const edu = [
  {
    course: 'Bacharelado em Sistemas e Mídias Digitais',
    school: 'Universidade Federal do Ceará - UFC',
    desc: `2017 – 2021`
  },
  {
    course: 'Curso Técnico Integrado de Informática',
    school: 'Instituto Federal de Educação, Ciência e Tecnologia do Ceará - IFCE',
    desc: `2008 – 2012`
  }
];

edu.forEach(item => {
  // Curso
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(0);
  doc.text(item.course, 75, yRight);

  yRight += 5;

  // Instituição
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(item.school, 75, yRight);

  yRight += 5;

  // Período / descrição
  doc.setFontSize(9);
  doc.setTextColor(50);
  doc.text(item.desc, 75, yRight, { maxWidth: 120 });

  yRight += 12;
});


  // ===== PREVIEW + DOWNLOAD =====

  // preview
  const url = doc.output('bloburl');
  window.open(url);

  // download
  //doc.save('Curriculo_Douglas_Silva.pdf');
});
