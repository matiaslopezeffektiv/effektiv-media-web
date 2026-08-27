# Effektiv Media — webbplats

Statisk sajt byggd på Averix-mallen. Inget ramverk — ett litet Node-skript
(`build.js`) slår ihop `src/pages/*.html` med de delade partials i
`src/partials/` (header, footer, scripts) och injicerar SEO-metadata och
JSON-LD från `src/pages.config.js`. Byggresultatet hamnar i `public/`.

## Utveckla lokalt

```bash
npm run build      # bygger public/
vercel dev          # kör lokalt med samma routing som produktion
```

## Struktur

- `src/pages/*.html` — innehållet för varje sida (bara det som ligger i `<main>`)
- `src/pages.config.js` — titel, beskrivning, canonical-URL, brödsmulor och
  structured-data-inställningar per sida. Sitemap genereras härifrån.
- `src/partials/` — delad header/offcanvas/sök, footer och script-tagglista
- `src/assets/` — kopia av Averix-mallens tillgångar (css/js/fonts/img),
  trimmad från döda/oanvända script-referenser
- `api/contact.js` — Vercel-serverless-funktion som skickar kontaktformuläret
  via Resend

## Kontaktformuläret — kräver konfiguration

`kontakt.html`s formulär postar till `/api/contact`, som skickar mejl via
[Resend](https://resend.com). Detta fungerar **inte** förrän följande är
satt som miljövariabler i Vercel-projektet (Project Settings → Environment
Variables):

- `RESEND_API_KEY` — API-nyckel från ett Resend-konto (gratisnivå räcker för
  denna volym)
- `CONTACT_TO_EMAIL` — adressen dit formulärsvar ska skickas, t.ex.
  `hej@effektivmedia.nu`

Fram tills dess svarar formuläret med ett fel och besökaren uppmanas ringa
eller mejla direkt istället.

## Bilder

Sidan använder just nu Averix-mallens platshållarbilder (gråa boxar med
mått, t.ex. "1920x1000") som platshållare för struktur och layout. Dessa
ska bytas ut mot riktiga foton/bilder innan lansering.

## Innan lansering på riktig domän

`vercel.json` sätter just nu `X-Robots-Tag: noindex` på alla sidor så att
`effektiv-media-web.vercel.app` inte indexeras av Google medan sajten är
under uppbyggnad. **Ta bort den `headers`-blocket i `vercel.json` när ni är
redo att gå live på `effektivmedia.nu`**, annars blockeras hela sajten från
sökmotorer även på den riktiga domänen.

## Domän

`vercel.json` har `cleanUrls: true`, vilket gör att `/kontakt.html` redirectar
till `/kontakt` och sidorna görs kanoniska på det formatet. Canonical-URL:er
i `src/pages.config.js` pekar mot `https://effektivmedia.nu` — uppdatera
`SITE`-konstanten där om domänen ändras.
