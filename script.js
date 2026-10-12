/**
 * RK Solutions - Lightweight Vanilla JS
 * Production-ready, zero dependencies, GitHub Pages optimized.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Header scroll effect
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Email Copy functionality
  const copyBtn = document.getElementById('copyEmailBtn');
  const emailText = 'rakesh@rksolutions.me';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailText);
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('copied');
        
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        // Fallback prompt if clipboard API is restricted
        window.prompt('Copy email address:', emailText);
      }
    });
  }

  // 3. Contact Form Submission
  const contactForm = document.getElementById('portfolioContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const subject = document.getElementById('userSubject')?.value.trim() || 'Inquiry from RK Solutions Portfolio';
      const message = document.getElementById('userMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formFeedback) {
          formFeedback.textContent = 'Please provide your name, email, and message.';
          formFeedback.className = 'form-feedback error';
        }
        return;
      }

      // Build mailto link
      const encodedSubject = encodeURIComponent(`[RK Solutions Inquiry] ${subject}`);
      const bodyContent = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
      const mailtoUrl = `mailto:rakesh@rksolutions.me?subject=${encodedSubject}&body=${encodeURIComponent(bodyContent)}`;

      if (formFeedback) {
        formFeedback.textContent = 'Launching your email client to dispatch to rakesh@rksolutions.me...';
        formFeedback.className = 'form-feedback success';
      }

      // Open mail client
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);
    });
  }

  // 4. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = navLinks.style.display === 'flex';
      navLinks.style.display = isExpanded ? 'none' : 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '70px';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.backgroundColor = 'rgba(8, 11, 17, 0.98)';
      navLinks.style.padding = '1.5rem';
      navLinks.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
      navLinks.style.gap = '1.25rem';
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.style.display = 'none';
        }
      });
    });
  }
});
