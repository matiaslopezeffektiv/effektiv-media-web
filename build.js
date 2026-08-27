#!/usr/bin/env node
// Zero-dependency static site build: stitches src/pages/*.html into the
// shared src/partials/*.html chrome, injects per-page SEO meta + JSON-LD
// from src/pages.config.js, and copies src/assets + src/static into public/.
'use strict';

const fs = require('fs');
const path = require('path');
const { SITE, ORG, PAGES } = require('./src/pages.config.js');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'src');
const OUT = path.join(ROOT, 'public');

function read(p) {
  return fs.readFileSync(p, 'utf8');
}

function esc(str) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function urlFor(pagePath) {
  return pagePath === '' ? `${SITE}/` : `${SITE}/${pagePath}`;
}

function breadcrumbJsonLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.path !== undefined ? urlFor(c.path) : undefined
    }))
  };
}

function serviceJsonLd(service, canonical) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: canonical,
    areaServed: { '@type': 'Country', name: 'Sweden' },
    provider: { '@id': `${SITE}/#organization` }
  };
}

function faqJsonLd(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a }
    }))
  };
}

function jsonLdScript(node) {
  return `<script type="application/ld+json">${JSON.stringify(node)}</script>`;
}

function buildJsonLd(key, meta, canonical) {
  const scripts = [jsonLdScript({ '@context': 'https://schema.org', ...ORG })];
  if (meta.breadcrumbs) scripts.push(jsonLdScript(breadcrumbJsonLd(meta.breadcrumbs)));
  if (meta.service) scripts.push(jsonLdScript(serviceJsonLd(meta.service, canonical)));
  if (meta.faq) scripts.push(jsonLdScript(faqJsonLd(meta.faq)));
  return scripts.join('\n');
}

function rimraf(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

function copyDir(src, dest) {
  fs.cpSync(src, dest, { recursive: true });
}

function buildPages() {
  const headTpl = read(path.join(SRC, 'partials', 'head.html'));
  const headerTpl = read(path.join(SRC, 'partials', 'header.html'));
  const footerTpl = read(path.join(SRC, 'partials', 'footer.html'));
  const scriptsTpl = read(path.join(SRC, 'partials', 'scripts.html'));

  const sitemapEntries = [];

  for (const [key, meta] of Object.entries(PAGES)) {
    const bodyPath = path.join(SRC, 'pages', `${key}.html`);
    if (!fs.existsSync(bodyPath)) {
      throw new Error(`Missing page body: src/pages/${key}.html (declared in pages.config.js)`);
    }
    const body = read(bodyPath);
    const canonical = urlFor(meta.path);
    const ogImage = meta.ogImage || require('./src/pages.config.js').DEFAULT_OG_IMAGE;
    const jsonld = buildJsonLd(key, meta, canonical);
    const bodyCursor = meta.bodyCursor ? ` ${meta.bodyCursor}` : '';

    let html = headTpl
      .replace(/{{TITLE}}/g, esc(meta.title))
      .replace(/{{DESCRIPTION}}/g, esc(meta.description))
      .replace(/{{CANONICAL}}/g, canonical)
      .replace(/{{OG_IMAGE}}/g, ogImage)
      .replace('{{JSONLD}}', jsonld);

    if (meta.noindex) {
      html = html.replace('</head>', '    <meta name="robots" content="noindex,follow">\n</head>');
    }

    html += headerTpl.replace('{{BODY_CURSOR}}', bodyCursor);
    html += body;
    html += footerTpl;
    html += scriptsTpl;

    const outFile = key === '404' ? '404.html' : (meta.path === '' ? 'index.html' : `${meta.path}.html`);
    fs.writeFileSync(path.join(OUT, outFile), html);

    if (!meta.noindex) {
      sitemapEntries.push(canonical);
    }
  }

  return sitemapEntries;
}

function buildSitemap(urls) {
  const today = new Date().toISOString().slice(0, 10);
  const body = urls
    .map((u) => `  <url>\n    <loc>${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), xml);
}

function main() {
  rimraf(OUT);
  fs.mkdirSync(OUT, { recursive: true });

  copyDir(path.join(SRC, 'assets'), path.join(OUT, 'assets'));
  copyDir(path.join(SRC, 'static'), OUT);

  const urls = buildPages();
  buildSitemap(urls);

  console.log(`Built ${Object.keys(PAGES).length} pages -> public/`);
}

main();
