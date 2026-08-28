// Central page metadata: title, description, canonical path, breadcrumbs and
// structured-data hints for every page. build.js reads this to assemble
// <head> meta, JSON-LD and sitemap.xml so nothing has to be duplicated
// by hand across 13 HTML files.

const SITE = 'https://effektivmedia.nu';
const DEFAULT_OG_IMAGE = `${SITE}/assets/img/hero/bg3.jpg`;

const ORG = {
  '@type': 'LocalBusiness',
  '@id': `${SITE}/#organization`,
  name: 'Effektiv Media AB',
  url: SITE,
  image: DEFAULT_OG_IMAGE,
  telephone: '+46101822590',
  email: 'hej@effektivmedia.nu',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Viaredsvägen 32',
    postalCode: '504 62',
    addressLocality: 'Borås',
    addressCountry: 'SE'
  },
  areaServed: 'SE',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:30',
      closes: '16:30'
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '09:00',
      closes: '15:00'
    }
  ],
  sameAs: ['https://www.reco.se/effektiv-media']
};

/** @type {Record<string, any>} */
const PAGES = {
  'index': {
    path: '',
    title: 'Mediabyrå i Borås – SEO, Hemsidor & Digital Marknadsföring | Effektiv Media',
    description: 'Effektiv Media är en digitalbyrå i Borås som hjälper företag i hela Sverige att synas online – SEO, hemsidor, e-handel, annonsering och digitala verktyg under ett tak.',
    ogImage: DEFAULT_OG_IMAGE
  },
  'om-oss': {
    path: 'om-oss',
    title: 'Om Effektiv Media – Digitalbyrå i Borås',
    description: 'Lär känna Effektiv Media: en samlad digitalbyrå i Borås som förenklar företagande genom webb, synlighet och digitala verktyg – utan underleverantörer.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Om oss' }]
  },
  'tjanster': {
    path: 'tjanster',
    title: 'Våra tjänster – SEO, Hemsidor, E-handel & Mer | Effektiv Media',
    description: 'Utforska Effektiv Medias tjänster: SEO & landningssidor, hemsidor, e-handel via Shopify, betald annonsering, juridik, Signello och Stampello.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster' }]
  },
  'tjanster-seo-landningssidor': {
    path: 'tjanster-seo-landningssidor',
    title: 'SEO-byrå & Landningssidor i Borås | Effektiv Media',
    description: 'Vi bygger högkonverterande landningssidor och optimerar er synlighet i sökmotorerna så att rätt kunder hittar er först. SEO-byrå med kunder i hela Sverige.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'SEO & Landningssidor' }],
    service: { name: 'SEO & Landningssidor', description: 'Sökmotoroptimering och konverterande landningssidor för svenska företag.' },
    faq: [
      { q: 'Hur lång tid tar det innan vi ser resultat av SEO?', a: 'De flesta kunder märker en tydlig förbättring i ranking och trafik inom 3–6 månader, beroende på konkurrens och utgångsläge. Landningssidor kan börja generera leads redan från lansering, medan organisk SEO byggs upp stegvis.' },
      { q: 'Vad ingår i en landningssida från Effektiv Media?', a: 'Research av målgrupp och sökord, copy och design anpassad för konvertering, teknisk SEO, snabb laddtid och uppföljning via Leadsportalen så ni ser resultatet i realtid.' },
      { q: 'Jobbar ni med företag utanför Borås?', a: 'Ja, vi arbetar rikstäckande med kunder i hela Sverige. Allt sköts digitalt, men ni är alltid välkomna att besöka oss på Viaredsvägen 32 i Borås.' }
    ]
  },
  'tjanster-hemsida': {
    path: 'tjanster-hemsida',
    title: 'Hemsida & Webbproduktion | Effektiv Media',
    description: 'Vi designar och utvecklar moderna, snabba hemsidor i WordPress (Elementor, Divi, Bricks) – skräddarsydda efter ert varumärke och byggda för att konvertera.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'Hemsida' }],
    service: { name: 'Hemsida', description: 'Design och utveckling av företagshemsidor i WordPress.' },
    faq: [
      { q: 'Hur lång tid tar det att få en ny hemsida?', a: 'En standardhemsida levereras normalt inom cirka 30 dagar från godkänd design, förutsatt att vi får material och feedback löpande under processen.' },
      { q: 'Vilket verktyg bygger ni hemsidor i?', a: 'Vi arbetar primärt i WordPress med Elementor, Divi eller Bricks beroende på projektets behov, vilket ger er full kontroll över innehållet efter lansering.' },
      { q: 'Ingår SEO i hemsidan?', a: 'Ja, alla hemsidor levereras med teknisk grundoptimering (struktur, hastighet, metadata). Vill ni satsa vidare på synlighet kombinerar vi gärna med vår tjänst SEO & Landningssidor.' }
    ]
  },
  'tjanster-e-handel-shopify': {
    path: 'tjanster-e-handel-shopify',
    title: 'E-handel via Shopify | Effektiv Media',
    description: 'Vi bygger konverterande Shopify-butiker – från design och produktuppsättning till betalning, frakt och SEO för e-handel.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'E-handel via Shopify' }],
    service: { name: 'E-handel via Shopify', description: 'Uppbyggnad och design av e-handelsbutiker på Shopify.' }
  },
  'tjanster-annonsering': {
    path: 'tjanster-annonsering',
    title: 'Betald Annonsering – Google & Meta Ads | Effektiv Media',
    description: 'Certifierad Google Partner som driver lönsam annonsering på Google Ads och Meta Ads – fler samtal, leads och konverteringar.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'Betald annonsering' }],
    service: { name: 'Betald annonsering (Google & Meta Ads)', description: 'Kampanjhantering på Google Ads och Meta Ads.' }
  },
  'tjanster-juridik': {
    path: 'tjanster-juridik',
    title: 'Effektiv Juridik – Digital Juridik för Företag | Effektiv Media',
    description: 'Genom vår samarbetspartner Effektiv Juridik får ni digital juridisk rådgivning, avtal och GDPR-stöd anpassat för mindre och medelstora företag.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'Effektiv Juridik' }],
    service: { name: 'Effektiv Juridik', description: 'Digital juridisk rådgivning via samarbetspartnern Effektiv Juridik.' }
  },
  'tjanster-signello': {
    path: 'tjanster-signello',
    title: 'Signello – Digitala Offerter & Avtal med BankID | Effektiv Media',
    description: 'Skapa proffsiga offerter och avtal, skicka dem på minuter och samla in juridiskt bindande signaturer med BankID via Signello – byggt i Sverige.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'Signello' }],
    service: { name: 'Signello', description: 'Digital offert- och avtalshantering med BankID-signering.' }
  },
  'tjanster-stampello': {
    path: 'tjanster-stampello',
    title: 'Stampello – Digitala Stämpelkort | Effektiv Media',
    description: 'Bygg kundlojalitet utan fysiska stämpelkort. Stampello ger mindre företag ett enkelt digitalt lojalitetsprogram.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Tjänster', path: 'tjanster' }, { name: 'Stampello' }],
    service: { name: 'Stampello', description: 'Digitala stämpel- och lojalitetskort för mindre företag.' }
  },
  'leadsportalen': {
    path: 'leadsportalen',
    title: 'Leadsportalen – Följ Leads & Ranking i Realtid | Effektiv Media',
    description: 'Leadsportalen samlar era inkommande leads och sökranking på ett ställe – logga in och följ utvecklingen i realtid.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Leadsportalen' }]
  },
  'kontakt': {
    path: 'kontakt',
    title: 'Kontakta Oss | Effektiv Media',
    description: 'Boka en kostnadsfri analys, en demo eller kom igång med en ny tjänst. Effektiv Media finns på Viaredsvägen 32 i Borås och arbetar rikstäckande.',
    breadcrumbs: [{ name: 'Hem', path: '' }, { name: 'Kontakta oss' }]
  },
  '404': {
    path: '404',
    title: 'Sidan hittades inte | Effektiv Media',
    description: 'Sidan du sökte kunde inte hittas.',
    noindex: true
  }
};

module.exports = { SITE, DEFAULT_OG_IMAGE, ORG, PAGES };
