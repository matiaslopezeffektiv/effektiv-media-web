// Vercel serverless function: POST /api/contact
// Sends the contact form to the Resend REST API. Requires RESEND_API_KEY and
// CONTACT_TO_EMAIL to be set as Vercel project environment variables — see
// README.md for setup. Until they're set, this returns a 500.

const SUBJECT_LABELS = {
  demo: 'Boka demo',
  analys: 'Analys av befintlig hemsida',
  kop: 'Köpa produkt',
  annat: 'Annat'
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method_not_allowed' });
    return;
  }

  const body = req.body || {};

  // Honeypot: bots fill every field, humans never see this one. Return a
  // fake success so bots don't learn to avoid it.
  if (body._gotcha) {
    res.status(200).json({ ok: true });
    return;
  }

  const name = (body.name || '').trim();
  const email = (body.email || '').trim();
  const phone = (body.phone || '').trim();
  const company = (body.company || '').trim();
  const subject = (body.subject || '').trim();
  const message = (body.message || '').trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !message || !emailRegex.test(email)) {
    res.status(400).json({ error: 'invalid_input' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !toEmail) {
    console.error('Missing RESEND_API_KEY or CONTACT_TO_EMAIL env vars');
    res.status(500).json({ error: 'not_configured' });
    return;
  }

  const subjectLabel = SUBJECT_LABELS[subject] || subject || 'Kontaktformulär';

  const html = `
    <h2>Nytt meddelande från kontaktformuläret</h2>
    <p><strong>Namn:</strong> ${escapeHtml(name)}</p>
    <p><strong>E-post:</strong> ${escapeHtml(email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phone || '–')}</p>
    <p><strong>Företag:</strong> ${escapeHtml(company || '–')}</p>
    <p><strong>Ärende:</strong> ${escapeHtml(subjectLabel)}</p>
    <p><strong>Meddelande:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
  `;

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Effektiv Media Web <onboarding@resend.dev>',
        to: toEmail,
        reply_to: email,
        subject: `Nytt meddelande: ${subjectLabel} — ${name}`,
        html
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      console.error('Resend error', resendRes.status, errText);
      res.status(502).json({ error: 'send_failed' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form send failed', err);
    res.status(500).json({ error: 'send_failed' });
  }
};
