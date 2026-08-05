/**
 * Build de produção — Especial Biomecânica
 * Gera dist/v1 e dist/v2 como projetos independentes.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const CleanCSS = require('clean-css');
const { minify: minifyHtml } = require('html-minifier-terser');
const { minify: minifyJs } = require('terser');
const sharp = require('sharp');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');
const CANONICAL_BASE = 'http://pos.personaltraineracademy.com.br/';

const PROJECTS = [
  {
    id: 'v1',
    srcDir: path.join(ROOT, 'v1'),
    canonical: CANONICAL_BASE,
    title: 'Especial de Biomecânica — Turma 10 | André Albuquerque',
    description:
      'Comemore a 10ª Turma da Pós em Biomecânica. Um dia inteiro 100% prático, online, com certificado. Ingresso por R$10.',
    ogImage: 'assets/banner-desktop.webp',
    assets: [
      { src: 'img/logoPTA.svg', dest: 'assets/logo-pta.svg', type: 'copy' },
      { src: 'img/branca e dourada.svg', dest: 'assets/logo-branca-dourada.svg', type: 'copy' },
      { src: 'img/mobile (2).webp', dest: 'assets/banner-desktop.webp', type: 'webp', quality: 82 },
      { src: 'img/banners copiar.webp', dest: 'assets/banner-mobile.webp', type: 'webp', quality: 82 },
      {
        src: 'img/Design sem nome - 2026-07-29T165152.444.png',
        dest: 'assets/selo-turma-10.webp',
        type: 'webp',
        quality: 85,
        maxWidth: 1200,
      },
      { src: 'img/aula.png', dest: 'assets/aula.webp', type: 'webp', quality: 88, maxWidth: 1800 },
      { src: 'img/biom.png', dest: 'assets/biom.webp', type: 'webp', quality: 85, maxWidth: 1600 },
      { src: 'img/andre-albuquerque.webp', dest: 'assets/andre-albuquerque.webp', type: 'webp', quality: 88, maxWidth: 1200 },
      { src: 'img/zorzi.webp', dest: 'assets/zorzi.webp', type: 'webp', quality: 88, maxWidth: 1200 },
      { src: 'img/bruno-sa.webp', dest: 'assets/bruno-sa.webp', type: 'webp', quality: 88, maxWidth: 1200 },
    ],
    pathMap: {
      'img/logoPTA.svg': 'assets/logo-pta.svg',
      'img/mobile%20(2).webp': 'assets/banner-desktop.webp',
      'img/mobile (2).webp': 'assets/banner-desktop.webp',
      'img/banners%20copiar.webp': 'assets/banner-mobile.webp',
      'img/banners copiar.webp': 'assets/banner-mobile.webp',
      'img/branca%20e%20dourada.svg': 'assets/logo-branca-dourada.svg',
      'img/branca e dourada.svg': 'assets/logo-branca-dourada.svg',
      'img/Design%20sem%20nome%20-%202026-07-29T165152.444.png': 'assets/selo-turma-10.webp',
      'img/Design sem nome - 2026-07-29T165152.444.png': 'assets/selo-turma-10.webp',
      'img/aula.png': 'assets/aula.webp',
      'img/biom.png': 'assets/biom.webp',
      'img/andre-albuquerque.webp': 'assets/andre-albuquerque.webp',
      'img/zorzi.webp': 'assets/zorzi.webp',
      'img/bruno-sa.webp': 'assets/bruno-sa.webp',
    },
  },
  {
    id: 'v2',
    srcDir: path.join(ROOT, 'v2'),
    canonical: `${CANONICAL_BASE}v2/`,
    title: 'Especial de Biomecânica · Turma 10 | André Albuquerque',
    description:
      'Um dia inteiro de Biomecânica ao vivo + 100 horas de conteúdos e certificações. Ingresso R$10. 23 de agosto de 2026.',
    ogImage: 'assets/banner-desktop.webp',
    assets: [
      { src: 'img/logoPTA.svg', dest: 'assets/logo-pta.svg', type: 'copy' },
      { src: 'img/branca e dourada.svg', dest: 'assets/logo-branca-dourada.svg', type: 'copy' },
      { src: 'img/mobile (2).webp', dest: 'assets/banner-desktop.webp', type: 'webp', quality: 82 },
      { src: 'img/banners copiar.webp', dest: 'assets/banner-mobile.webp', type: 'webp', quality: 82 },
      { src: 'img/aula.png', dest: 'assets/aula.webp', type: 'webp', quality: 88, maxWidth: 1800 },
      {
        src: 'img/100-horas-biomecanica-pratica.webp',
        dest: 'assets/100-horas.webp',
        type: 'webp',
        quality: 82,
        maxWidth: 1200,
      },
      {
        src: 'img/certificacao-joelho.webp',
        dest: 'assets/certificacao-joelho.webp',
        type: 'webp',
        quality: 82,
        maxWidth: 1000,
      },
      {
        src: 'img/certificacao-ombro.webp',
        dest: 'assets/certificacao-ombro.webp',
        type: 'webp',
        quality: 82,
        maxWidth: 1000,
      },
      {
        src: 'img/certificacao-coluna.webp',
        dest: 'assets/certificacao-coluna.webp',
        type: 'webp',
        quality: 82,
        maxWidth: 1000,
      },
      {
        src: 'img/certificado-participacao.webp',
        dest: 'assets/certificado-participacao.webp',
        type: 'webp',
        quality: 82,
        maxWidth: 1000,
      },
      { src: 'img/biom.png', dest: 'assets/biom.webp', type: 'webp', quality: 85, maxWidth: 1600 },
      { src: 'img/andre-albuquerque.webp', dest: 'assets/andre-albuquerque.webp', type: 'webp', quality: 88, maxWidth: 1200 },
      { src: 'img/zorzi.webp', dest: 'assets/zorzi.webp', type: 'webp', quality: 88, maxWidth: 1200 },
      { src: 'img/bruno-sa.webp', dest: 'assets/bruno-sa.webp', type: 'webp', quality: 88, maxWidth: 1200 },
      { src: 'img/bryan-web.webp', dest: 'assets/bryan-web.webp', type: 'webp', quality: 82, maxWidth: 1600 },
    ],
    pathMap: {
      'img/logoPTA.svg': 'assets/logo-pta.svg',
      'img/branca%20e%20dourada.svg': 'assets/logo-branca-dourada.svg',
      'img/branca e dourada.svg': 'assets/logo-branca-dourada.svg',
      'img/mobile%20(2).webp': 'assets/banner-desktop.webp',
      'img/mobile (2).webp': 'assets/banner-desktop.webp',
      'img/banners%20copiar.webp': 'assets/banner-mobile.webp',
      'img/banners copiar.webp': 'assets/banner-mobile.webp',
      'img/aula.png': 'assets/aula.webp',
      'img/100-horas-biomecanica-pratica.webp': 'assets/100-horas.webp',
      'img/certificacao-joelho.webp': 'assets/certificacao-joelho.webp',
      'img/certificacao-ombro.webp': 'assets/certificacao-ombro.webp',
      'img/certificacao-coluna.webp': 'assets/certificacao-coluna.webp',
      'img/certificado-participacao.webp': 'assets/certificado-participacao.webp',
      'img/biom.png': 'assets/biom.webp',
      'img/andre-albuquerque.webp': 'assets/andre-albuquerque.webp',
      'img/zorzi.webp': 'assets/zorzi.webp',
      'img/bruno-sa.webp': 'assets/bruno-sa.webp',
      'img/bryan-web.webp': 'assets/bryan-web.webp',
    },
  },
];

function rmrf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function extractBetween(html, startRe, endRe) {
  const start = html.search(startRe);
  if (start < 0) return null;
  const afterStart = html.slice(start);
  const openEnd = afterStart.indexOf('>');
  const contentStart = start + openEnd + 1;
  const end = html.slice(contentStart).search(endRe);
  if (end < 0) return null;
  return {
    content: html.slice(contentStart, contentStart + end),
  };
}

async function optimizeAssets(project, outDir) {
  console.log(`  → Assets ${project.id}`);
  for (const file of project.assets) {
    const from = path.join(project.srcDir, file.src);
    const to = path.join(outDir, file.dest);
    ensureDir(path.dirname(to));
    if (!fs.existsSync(from)) throw new Error(`[${project.id}] Asset não encontrado: ${file.src}`);
    if (file.type === 'copy') {
      fs.copyFileSync(from, to);
      continue;
    }
    let pipeline = sharp(from).rotate();
    if (file.maxWidth) pipeline = pipeline.resize({ width: file.maxWidth, withoutEnlargement: true });
    await pipeline.webp({ quality: file.quality, effort: 5 }).toFile(to);
    const before = fs.statSync(from).size;
    const after = fs.statSync(to).size;
    console.log(
      `    ${path.basename(file.dest)}: ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`
    );
  }
}

function buildCss(project, outDir, customCss, htmlForScan) {
  console.log(`  → CSS ${project.id}`);
  const tmpDir = path.join(ROOT, `.build-tmp-${project.id}`);
  ensureDir(tmpDir);

  const contentHtml = path.join(tmpDir, 'content.html');
  fs.writeFileSync(contentHtml, htmlForScan, 'utf8');

  const inputCss = path.join(tmpDir, 'input.css');
  fs.writeFileSync(
    inputCss,
    `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n${customCss}\n`,
    'utf8'
  );

  const twConfig = path.join(tmpDir, 'tailwind.config.js');
  fs.writeFileSync(
    twConfig,
    `module.exports = {
  content: [${JSON.stringify(contentHtml)}],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#001F35',
          surface: '#031A26',
          primary: '#B9915B',
          primaryHover: '#D4A86E',
          accent: '#842E20',
          success: '#0CC143',
          darkgray: '#031A26',
          textPrimary: '#F5F4F3',
          textSecondary: '#C7C7C7',
          textMuted: '#616B85',
          soft: '#F3E8D6',
          softBorder: '#D4B896',
          light: '#F5F4F3',
          ink: '#001F35',
          body: '#3A4A58',
          border: 'rgba(255, 255, 255, 0.08)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        oswald: ['Oswald', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        shimmer: { '100%': { transform: 'translateX(100%)' } }
      }
    }
  },
  plugins: [],
};
`,
    'utf8'
  );

  const outCss = path.join(tmpDir, 'out.css');
  const twBin = path.join(ROOT, 'node_modules', '.bin', 'tailwindcss');
  execFileSync(twBin, ['-c', twConfig, '-i', inputCss, '-o', outCss, '--minify'], {
    stdio: 'pipe',
  });

  let css = fs.readFileSync(outCss, 'utf8');
  css = new CleanCSS({ level: 2 }).minify(css).styles;
  ensureDir(path.join(outDir, 'css'));
  fs.writeFileSync(path.join(outDir, 'css', 'styles.css'), css, 'utf8');
  rmrf(tmpDir);
  console.log(`    css/styles.css: ${(Buffer.byteLength(css) / 1024).toFixed(1)}KB`);
}

async function buildJs(project, outDir, jsSource) {
  console.log(`  → JS ${project.id}`);
  const wrapped = `${jsSource}
;window.abrirPopup=abrirPopup;window.fecharPopup=fecharPopup;`;
  const result = await minifyJs(wrapped, {
    compress: { drop_console: false, passes: 2 },
    mangle: { toplevel: false, reserved: ['abrirPopup', 'fecharPopup', 'AOS'] },
    format: { comments: false },
  });
  if (result.error) throw result.error;
  ensureDir(path.join(outDir, 'js'));
  fs.writeFileSync(path.join(outDir, 'js', 'main.js'), result.code, 'utf8');
  console.log(`    js/main.js: ${(Buffer.byteLength(result.code) / 1024).toFixed(1)}KB`);
}

function rewriteAssetPaths(html, pathMap) {
  let out = html;
  const entries = Object.entries(pathMap).sort((a, b) => b[0].length - a[0].length);
  for (const [from, to] of entries) out = out.split(from).join(to);
  return out;
}

function injectSeoHead(html, project) {
  const ogImage = `${project.canonical}${project.ogImage}`;
  const seoBlock = `
    <title>${project.title}</title>
    <meta name="description" content="${project.description}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="${project.canonical}">
    <meta property="og:type" content="website">
    <meta property="og:locale" content="pt_BR">
    <meta property="og:site_name" content="Personal Trainer Academy">
    <meta property="og:title" content="${project.title}">
    <meta property="og:description" content="${project.description}">
    <meta property="og:url" content="${project.canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:alt" content="Especial de Biomecânica Turma 10">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${project.title}">
    <meta name="twitter:description" content="${project.description}">
    <meta name="twitter:image" content="${ogImage}">
    <link rel="icon" href="assets/logo-pta.svg" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="preconnect" href="https://unpkg.com">
    <link rel="dns-prefetch" href="https://hook.us1.make.com">
    <link rel="dns-prefetch" href="https://chk.eduzz.com">
    <link rel="dns-prefetch" href="https://hub-pta.vercel.app">
`;

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, '');
  out = out.replace(/<meta\s+name="description"[^>]*>/i, '');
  out = out.replace(/<script\s+src="https:\/\/cdn\.tailwindcss\.com"><\/script>/i, '');
  out = out.replace(/<script>\s*tailwind\.config\s*=[\s\S]*?<\/script>/i, '');
  out = out.replace(/<style>[\s\S]*?<\/style>/i, '');
  out = out.replace(/<link\s+rel="preconnect"\s+href="https:\/\/fonts\.googleapis\.com"\s*>/i, '');
  out = out.replace(/<link\s+rel="preconnect"\s+href="https:\/\/fonts\.gstatic\.com"[^>]*>/i, '');

  out = out.replace(/(<meta\s+name="viewport"[^>]*>)/i, (match) => {
    return `${match}\n${seoBlock}\n    <link rel="stylesheet" href="css/styles.css">`;
  });

  return out;
}

async function buildHtml(project, outDir, bodyHtml) {
  console.log(`  → HTML ${project.id}`);
  let html = bodyHtml;
  html = html.replace(
    /<script>(?![\s\S]*src=)[\s\S]*?<\/script>\s*<\/body>/i,
    '<script src="js/main.js" defer></script>\n</body>'
  );
  html = html.replace(/alt="LOGO"/g, 'alt="Personal Trainer Academy"');

  html = await minifyHtml(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: false,
    minifyCSS: false,
    minifyJS: false,
    keepClosingSlash: true,
    sortAttributes: false,
    sortClassName: false,
    collapseBooleanAttributes: true,
  });

  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
  console.log(`    index.html: ${(Buffer.byteLength(html) / 1024).toFixed(1)}KB`);
}

function writeDistIndex() {
  const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=v1/">
  <link rel="canonical" href="${CANONICAL_BASE}">
  <title>Especial de Biomecânica — Turma 10</title>
  <script>location.replace('v1/');</script>
</head>
<body>
  <p><a href="v1/">Abrir V1</a> · <a href="v2/">Abrir V2</a></p>
</body>
</html>
`;
  fs.writeFileSync(path.join(DIST, 'index.html'), html.replace(/\n\s*/g, ''), 'utf8');
}

async function buildProject(project) {
  console.log(`\n▶ Build ${project.id}`);
  const srcHtml = path.join(project.srcDir, 'index.html');
  if (!fs.existsSync(srcHtml)) throw new Error(`Fonte não encontrada: ${srcHtml}`);

  const outDir = path.join(DIST, project.id);
  ensureDir(outDir);
  ensureDir(path.join(outDir, 'css'));
  ensureDir(path.join(outDir, 'js'));
  ensureDir(path.join(outDir, 'assets'));

  const raw = fs.readFileSync(srcHtml, 'utf8');
  const styleBlock = extractBetween(raw, /<style\b/i, /<\/style>/i);
  const customCss = styleBlock ? styleBlock.content.trim() : '';

  const scriptMatches = [...raw.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)];
  let appJs = '';
  for (const m of scriptMatches) {
    const code = m[1].trim();
    if (code.startsWith('tailwind.config')) continue;
    if (code.includes('pulseq') || code.includes('window.pulseq')) continue;
    if (code.includes('WEBHOOK_URL') || code.includes('abrirPopup')) appJs = code;
  }
  if (!appJs) throw new Error(`[${project.id}] Script principal não encontrado`);

  let htmlWorking = rewriteAssetPaths(raw, project.pathMap);
  htmlWorking = injectSeoHead(htmlWorking, project);

  await optimizeAssets(project, outDir);
  buildCss(project, outDir, customCss, htmlWorking);
  await buildJs(project, outDir, appJs);
  await buildHtml(project, outDir, htmlWorking);

  const distHtml = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
  const distJs = fs.readFileSync(path.join(outDir, 'js', 'main.js'), 'utf8');
  const checks = {
    canonical: distHtml.includes(project.canonical),
    form: /form_[a-z0-9_]+/i.test(distHtml) && distHtml.includes('lead-nome'),
    css: distHtml.includes('css/styles.css'),
    js: distHtml.includes('js/main.js'),
    noCdnTw: !distHtml.includes('cdn.tailwindcss.com'),
    webhook: distJs.includes('hook.us1.make.com'),
    redirect: distJs.includes('chk.eduzz.com'),
    pulsePixel: distHtml.includes('hub-pta.vercel.app/api/tracking/pixel.js') && distHtml.includes('wesley-maciel-da41187'),
  };
  for (const [k, v] of Object.entries(checks)) {
    console.log(`    ${v ? 'PASS' : 'FAIL'} — ${k}`);
    if (!v) throw new Error(`[${project.id}] Validação falhou: ${k}`);
  }
}

async function main() {
  console.log('▶ Build de produção (v1 + v2)');
  console.log(`  Base canônica: ${CANONICAL_BASE}`);

  rmrf(DIST);
  ensureDir(DIST);

  for (const project of PROJECTS) {
    await buildProject(project);
  }

  writeDistIndex();
  console.log('\n✅ dist/ pronto:');
  console.log('  dist/index.html  → redireciona para v1/');
  console.log('  dist/v1/         → projeto V1');
  console.log('  dist/v2/         → projeto V2');
}

main().catch((err) => {
  console.error('\n❌ Build falhou:', err.message || err);
  process.exit(1);
});
