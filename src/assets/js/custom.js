// Effektiv Media additions on top of the Averix theme JS.
// Currently just wires up the accessible contact form to /api/contact.
(function () {
  'use strict';

  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('contact-form-status');
  var submitBtn = form.querySelector('.si-submit-btn');

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'si-form-status is-visible is-' + type;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (form.querySelector('[name="_gotcha"]').value) {
      return; // honeypot triggered, silently drop
    }

    var required = form.querySelectorAll('[required]');
    for (var i = 0; i < required.length; i++) {
      if (!required[i].value.trim()) {
        setStatus('Fyll i alla obligatoriska fält innan du skickar.', 'error');
        required[i].focus();
        return;
      }
    }

    var data = Object.fromEntries(new FormData(form).entries());

    if (submitBtn) submitBtn.setAttribute('disabled', 'disabled');
    setStatus('Skickar...', 'success');

    fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('request-failed');
        return res.json();
      })
      .then(function () {
        setStatus('Tack! Vi hör av oss inom en arbetsdag.', 'success');
        form.reset();
      })
      .catch(function () {
        setStatus('Något gick fel. Ring oss gärna på 010 182 25 90 eller mejla hej@effektivmedia.nu istället.', 'error');
      })
      .finally(function () {
        if (submitBtn) submitBtn.removeAttribute('disabled');
      });
  });
})();
