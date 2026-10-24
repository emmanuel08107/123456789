// De-Rock International School - Interactive Client Logic
// Location: Plot 11, Falade Street, State Housing Estate, Ado-Ekiti, Nigeria

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initAcademicTabs();
  initFaqAccordion();
  initModals();
  initSearch();
  initContactForm();
  initAdmissionForm();
  initResultChecker();
  initMap();
  initToast();
});

/* ==========================================================
   1. Theme Toggle (Dark & Light Mode)
   ========================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const savedTheme = localStorage.getItem('derock_theme') || 'light';
  
  applyTheme(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem('derock_theme', newTheme);
      showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeIcons = document.querySelectorAll('.theme-toggle-btn i');
  themeIcons.forEach(icon => {
    if (theme === 'dark') {
      icon.className = 'fas fa-sun';
    } else {
      icon.className = 'fas fa-moon';
    }
  });
}

/* ==========================================================
   2. Responsive Navigation & Smooth Scrolling
   ========================================================== */
function initNavigation() {
  const hamburgerBtn = document.getElementById('hamburger-toggle');
  const navLinks = document.getElementById('nav-links-menu');
  const links = document.querySelectorAll('.nav-links a');

  if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburgerBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    links.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburgerBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Active link highlighter on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');
      const navItem = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
      
      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add('active');
        } else {
          navItem.classList.remove('active');
        }
      }
    });
  });
}

/* ==========================================================
   3. Academic Programs Tabs
   ========================================================== */
function initAcademicTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });
}

/* ==========================================================
   4. Frequently Asked Questions (Accordion)
   ========================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other accordion items for clean accordion UX
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        item.classList.toggle('active', !isActive);
      });
    }
  });
}

/* ==========================================================
   5. Modals System (Admission, Student/Staff Portal, Downloads)
   ========================================================== */
function initModals() {
  // Open modal buttons
  document.querySelectorAll('[data-modal-target]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      openModal(modalId);
    });
  });

  // Close buttons
  document.querySelectorAll('.modal-close-btn, .modal-close-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const openModalElem = btn.closest('.modal-overlay');
      if (openModalElem) {
        closeModal(openModalElem.id);
      }
    });
  });

  // Close when clicking outside modal-card
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal(overlay.id);
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(modal => {
        closeModal(modal.id);
      });
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================
   6. Search System (Instant filtering across website)
   ========================================================== */
function initSearch() {
  const searchInput = document.getElementById('global-search-input');
  const searchResults = document.getElementById('search-results-box');

  // Keyboard shortcut Ctrl+K or / to open search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey && e.key === 'k') || (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')) {
      e.preventDefault();
      openModal('modal-search');
      setTimeout(() => {
        if (searchInput) searchInput.focus();
      }, 100);
    }
  });

  if (searchInput && searchResults && typeof DEROCK_DATA !== 'undefined') {
    renderSearchResults(DEROCK_DATA.searchIndex);

    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase().trim();
      if (!term) {
        renderSearchResults(DEROCK_DATA.searchIndex);
        return;
      }

      const filtered = DEROCK_DATA.searchIndex.filter(item => 
        item.title.toLowerCase().includes(term) || item.type.toLowerCase().includes(term)
      );
      renderSearchResults(filtered);
    });
  }
}

function renderSearchResults(items) {
  const container = document.getElementById('search-results-box');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <li style="padding: 1.5rem; text-align: center; color: var(--text-muted);">
        <i class="fas fa-search" style="font-size: 1.5rem; margin-bottom: 0.5rem; display: block;"></i>
        No matching pages or topics found. Try searching for "Admission", "Portal", "ICT", or "Location".
      </li>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <li onclick="navigateToSection('${item.section}')">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-weight: 600; color: var(--text-heading);">${item.title}</span>
        <span class="badge-gold" style="font-size: 0.7rem;">${item.type}</span>
      </div>
    </li>
  `).join('');
}

window.navigateToSection = function(sectionId) {
  closeModal('modal-search');
  const targetElem = document.querySelector(sectionId);
  if (targetElem) {
    targetElem.scrollIntoView({ behavior: 'smooth' });
  }
};

/* ==========================================================
   7. Academic Results Portal (Authentic Terminal Report Card)
   ========================================================== */
function initResultChecker() {
  const checkBtn = document.getElementById('btn-check-result');
  const studentIdInput = document.getElementById('check-student-id');
  const pinInput = document.getElementById('check-pin');
  const reportContainer = document.getElementById('report-card-output');
  const prefillBtn = document.getElementById('btn-prefill-demo');

  // Demo prefill helper
  if (prefillBtn && studentIdInput && pinInput) {
    prefillBtn.addEventListener('click', () => {
      studentIdInput.value = 'DRS/2026/0142';
      pinInput.value = '2026';
      showToast('Demo Credentials Loaded (DRS/2026/0142)', 'info');
    });
  }

  if (checkBtn && studentIdInput && reportContainer) {
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = studentIdInput.value.trim().toUpperCase();
      const pin = pinInput.value.trim();

      if (!id || !pin) {
        showToast('Please enter both Student ID and Scratch PIN', 'warning');
        return;
      }

      checkBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying Pin & Fetching...';
      checkBtn.disabled = true;

      setTimeout(() => {
        checkBtn.innerHTML = '<i class="fas fa-search"></i> Check Result';
        checkBtn.disabled = false;

        const student = DEROCK_DATA.demoStudentResults[id];
        if (student && pin === student.pin) {
          renderReportCard(student, reportContainer);
          showToast(`Result fetched successfully for ${student.name}!`, 'success');
        } else {
          showToast('Invalid Student ID or Scratch Card PIN. Click "Load Demo ID" to test.', 'error');
        }
      }, 700);
    });
  }
}

function renderReportCard(student, container) {
  const scoresRows = student.scores.map(s => `
    <tr>
      <td>${s.subject}</td>
      <td>${s.ca} / 40</td>
      <td>${s.exam} / 60</td>
      <td><strong>${s.total}%</strong></td>
      <td><span style="color: ${s.grade.startsWith('A') ? '#10b981' : '#f59e0b'}; font-weight: 700;">${s.grade}</span></td>
      <td>${s.remark}</td>
    </tr>
  `).join('');

  container.innerHTML = `
    <div class="report-card" id="printable-report">
      <div class="report-header">
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.75rem; margin-bottom: 0.5rem;">
          <div style="width: 40px; height: 40px; background: #0a192f; border: 2px solid #f59e0b; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #f59e0b; font-weight: 800;">
            DRS
          </div>
          <div>
            <h2>DE-ROCK INTERNATIONAL SCHOOL</h2>
            <p style="font-weight: 600; color: #f59e0b;">Plot 11, Falade Street, State Housing Estate, Ado-Ekiti, Ekiti State, Nigeria</p>
          </div>
        </div>
        <p style="text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em; margin-top: 0.25rem;">
          OFFICIAL TERMINAL CONTINUOUS ASSESSMENT & EXAMINATION REPORT
        </p>
      </div>

      <div class="report-student-meta">
        <div><strong>Student Name:</strong> ${student.name}</div>
        <div><strong>Admission No:</strong> ${student.id}</div>
        <div><strong>Class:</strong> ${student.class}</div>
        <div><strong>Academic Session:</strong> ${student.session}</div>
        <div><strong>Term:</strong> ${student.term}</div>
        <div><strong>Position in Class:</strong> <span style="color: #0a192f; font-weight: 800;">${student.position}</span></div>
      </div>

      <table class="report-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>CA Score (40)</th>
            <th>Exam Score (60)</th>
            <th>Total Score (100)</th>
            <th>Grade</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          ${scoresRows}
        </tbody>
      </table>

      <div style="background: #f8fafc; padding: 1rem; border-radius: 6px; margin-bottom: 1rem; font-size: 0.85rem; border: 1px solid #e2e8f0;">
        <p style="margin-bottom: 0.4rem;"><strong>Form Teacher's Comment:</strong> ${student.teacherComment}</p>
        <p><strong>Proprietress's Endorsement:</strong> <em>"${student.proprietressComment}"</em></p>
      </div>

      <div class="report-footer-summary">
        <div><strong>Attendance:</strong> ${student.attendance}</div>
        <div><strong>Cumulative Average:</strong> <span style="font-size: 1.1rem; color: #0a192f; font-weight: 800;">${student.average}</span></div>
        <div><strong>Verdict:</strong> <span style="color: #10b981; font-weight: 800;">PROMOTED WITH DISTINCTION</span></div>
      </div>

      <div style="text-align: center; margin-top: 1.5rem;">
        <button onclick="window.print()" class="btn btn-navy btn-sm">
          <i class="fas fa-print"></i> Print Official Report Sheet
        </button>
      </div>
    </div>
  `;
}

/* ==========================================================
   8. Online Admission Application Form
   ========================================================== */
function initAdmissionForm() {
  const form = document.getElementById('admission-online-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Application...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      const studentName = form.querySelector('[name="student_name"]').value || 'Prospective Student';
      const selectedClass = form.querySelector('[name="class_applying"]').value || 'Selected Class';

      closeModal('modal-admission');
      form.reset();

      // Show confirmation alert & toast
      showToast(`Admission Application successfully submitted for ${studentName}! Reference: DRS/ADM/2026-${Math.floor(1000 + Math.random() * 9000)}`, 'success');

      alert(`🎉 Congratulations! Your application for ${studentName} into ${selectedClass} for the 2026/2027 Academic Session at De-Rock International School, Ado-Ekiti has been registered. Our admissions office will contact you via email/phone for the entrance screening schedule.`);
    }, 1000);
  });
}

/* ==========================================================
   9. Online Contact Form
   ========================================================== */
function initContactForm() {
  const form = document.getElementById('school-contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-paper-plane fa-spin"></i> Sending Message...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      showToast('Thank you for contacting De-Rock International School. We will respond shortly.', 'success');
      form.reset();

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.disabled = false;
      }, 2500);
    }, 800);
  });
}

/* ==========================================================
   10. Interactive Location Map (Leaflet.js)
   Location: Plot 11, Falade Street, State Housing Estate, Ado-Ekiti
   ========================================================== */
function initMap() {
  const mapElement = document.getElementById('school-map');
  if (!mapElement || typeof L === 'undefined') return;

  // Approximate coordinates for State Housing Estate, Ado-Ekiti, Ekiti State, Nigeria
  const adoEkitiCoords = [7.6322, 5.2345];

  const map = L.map('school-map', {
    scrollWheelZoom: false
  }).setView(adoEkitiCoords, 15);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const customIcon = L.divIcon({
    className: 'custom-map-marker',
    html: `<div style="background: #0a192f; border: 3px solid #f59e0b; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #f59e0b; box-shadow: 0 4px 12px rgba(0,0,0,0.4);"><i class="fas fa-graduation-cap"></i></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  const marker = L.marker(adoEkitiCoords, { icon: customIcon }).addTo(map);

  marker.bindPopup(`
    <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 0.2rem;">
      <h4 style="margin: 0 0 0.3rem 0; color: #0a192f; font-weight: 800;">De-Rock International School</h4>
      <p style="margin: 0; font-size: 0.85rem; color: #475569;">
        Plot 11, Falade Street, State Housing Estate, Ado-Ekiti, Ekiti State, Nigeria.
      </p>
      <div style="margin-top: 0.5rem;">
        <a href="https://maps.google.com/?q=State+Housing+Estate+Ado-Ekiti" target="_blank" style="color: #f59e0b; font-weight: 700; font-size: 0.8rem;">
          Get Driving Directions &rarr;
        </a>
      </div>
    </div>
  `).openPopup();
}

/* ==========================================================
   11. Toast Notification Utility
   ========================================================== */
let toastContainer = null;

function initToast() {
  toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
}

function showToast(message, type = 'info') {
  if (!toastContainer) initToast();

  const toast = document.createElement('div');
  toast.className = 'toast';

  let icon = 'fas fa-info-circle';
  if (type === 'success') icon = 'fas fa-check-circle';
  if (type === 'warning') icon = 'fas fa-exclamation-triangle';
  if (type === 'error') icon = 'fas fa-times-circle';

  toast.innerHTML = `
    <i class="${icon}" style="color: var(--gold-primary); font-size: 1.1rem;"></i>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
