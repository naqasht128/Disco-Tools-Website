/**
 * PESCO Tools Website - Contact & FAQ Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  setupContactForm();
  setupFAQAccordion();
});

// Setup Contact Form Validation & Simulated Submission
function setupContactForm() {
  const form = document.getElementById('pesco-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const subDivision = document.getElementById('contact-subdivision')?.value.trim();
    const contactInfo = document.getElementById('contact-phone-email')?.value.trim();
    const tool = document.getElementById('contact-tool')?.value;
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !subDivision || !contactInfo || !message) {
      showToast('Please fill in all required fields to submit your inquiry.', 'warning', 'Missing Details');
      return;
    }

    // Disable button and show spinner
    const submitBtn = document.getElementById('contact-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Submitting Ticket...
    `;

    setTimeout(() => {
      // Show confirmation state
      const formContainer = document.getElementById('form-card-container');
      if (formContainer) {
        formContainer.innerHTML = `
          <div class="text-center py-12 px-6">
            <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 animate-float">
              <i data-lucide="check-circle" class="w-8 h-8"></i>
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Inquiry Dispatched Successfully</h3>
            <p class="text-slate-300 text-sm max-w-md mx-auto mb-6">
              Thank you, <strong>${name}</strong> (${subDivision}). Your technical ticket regarding <strong>${tool || 'PESCO Tools'}</strong> has been registered. Our support team will reach out via WhatsApp/Email shortly.
            </p>
            <div class="bg-slate-900/80 rounded-xl p-4 max-w-sm mx-auto font-mono text-xs text-sky-400 border border-white/5 mb-6">
              Ticket Ref: #PES-${Math.floor(100000 + Math.random() * 900000)}
            </div>
            <button onclick="window.location.reload()" class="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-white/10 transition-colors">
              Submit Another Inquiry
            </button>
          </div>
        `;
        refreshIcons();
      }

      showToast('Your message has been sent to the PESCO Tools Development Desk.', 'success', 'Ticket Dispatched');
    }, 1200);
  });
}

// Setup FAQ Accordion Toggles
function setupFAQAccordion() {
  const faqButtons = document.querySelectorAll('.faq-toggle-btn');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isExpanded = !content.classList.contains('hidden');

      // Close other accordions
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isExpanded) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}
