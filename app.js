/**
 * MRINANK GAUR — PORTFOLIO CONTROLLER
 * Vanilla JavaScript implementation for theme toggling, project filtering,
 * command palette (Ctrl+K), resume switching, modal dialogs, and copy notifications.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // 1. THEME MANAGEMENT
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  const rootElement = document.documentElement;

  const getPreferredTheme = () => {
    const saved = localStorage.getItem('site-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const setTheme = (theme) => {
    rootElement.setAttribute('data-theme', theme);
    localStorage.setItem('site-theme', theme);

    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#f8fafc' : '#080b10');
    }

    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      const icon = themeToggleBtn.querySelector('.theme-icon');
      if (icon) {
        if (theme === 'light') {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
        } else {
          icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
        }
      }
    }
  };

  setTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = rootElement.getAttribute('data-theme') || 'dark';
      setTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  // --------------------------------------------------------------------------
  // 2. PROJECT FILTERING
  // --------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      filterTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 3. PROJECT ARCHITECTURE DEEP DIVE MODAL
  // --------------------------------------------------------------------------
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalProblem = document.getElementById('modal-problem');
  const modalArchitecture = document.getElementById('modal-architecture');
  const modalTechDetails = document.getElementById('modal-tech-details');
  const modalDemoBtn = document.getElementById('modal-demo-btn');
  const modalRepoBtn = document.getElementById('modal-repo-btn');

  const projectData = {
    gait: {
      category: "Machine Learning & Distributed Systems",
      title: "Real-Time Mood Detection via Gait Analysis",
      problem: "Biometric mood detection traditionally relies on intrusive facial or vocal cues. This project pioneers non-intrusive emotional inference by analyzing continuous dynamic gait and foot-force distributions in real time.",
      architecture: `[ESP32 Force & IMU Sensors] (50-100Hz Telemetry)
         │
         ▼ (WebSocket Stream)
[Python FastAPI Asynchronous Server]
         │
         ▼
[Feature Extraction & Scikit-Learn Random Forest Pipeline]
         │
         ├──> Biometric Inference (>90% Accuracy)
         │
         ▼ (Low-Latency WebSocket Broadcast)
[Next.js Dynamic Heatmap & Orientation Telemetry Dashboard]`,
      techDetails: "Engineered sub-50ms data streaming with asynchronous WebSockets in FastAPI. Designed calibrated pressure heatmaps with WebGL/Canvas and handled sensor noise filtering with moving average windowing on ESP32 firmware.",
      demoUrl: null,
      repoUrl: "https://github.com/MrinankGaur/Mood-Detection-Using-GAIT-Analysis"
    },
    shopalytics: {
      category: "Full-Stack SaaS & Cloud",
      title: "Shopalytics — B2B Analytics SaaS for Shopify",
      problem: "Independent Shopify merchants struggle to extract actionable unit economics and cohort retention trends from raw store data without paying for enterprise-tier BI tools.",
      architecture: `[Shopify Webhook & REST Sync]
         │
         ▼
[Next.js Server Actions & API Route Layer]
         │
         ├──> Role-Based Auth (Tenant Isolation)
         ▼
[PostgreSQL Database via Prisma ORM]
         │
         ▼
[Real-Time Aggregations (LTV, Cohorts, AOV)]
         │
         ▼
[Interactive Responsive Next.js Analytics Dashboard]`,
      techDetails: "Architected secure multi-tenant schema with Prisma PostgreSQL. Automated asynchronous order ingestion, refund reconciliation, and rate-limited Shopify API polling. Designed interactive SVG analytics charts with instant date filtering.",
      demoUrl: "https://shopalytics.vercel.app/",
      repoUrl: "https://github.com/MrinankGaur/Shopalytics"
    },
    glove: {
      category: "Embedded Firmware & Machine Learning",
      title: "Flex-Sensor Smart Glove for Sign Language Translation",
      problem: "Spoken communication barriers isolate millions of mute and deaf individuals. Wearable translators often suffer from sensor drift, bulky hardware, and high inference latency.",
      architecture: `[5x Flex Sensors + MPU6050 6-Axis IMU]
         │
         ▼ (I2C / ADC Calibrated Readings)
[ESP32 Microcontroller Firmare (50-100 Hz)]
         │
         ▼ (Bluetooth / WiFi Serial Stream)
[Python LSTM Gesture Classifier (<100ms Inference)]
         │
         ├──> 80.4% Test Accuracy Across 30+ ASL Signs
         │
         ▼ (Multilingual TTS Pipeline)
[Next.js Visualizer + 5-Language Speech Output]`,
      techDetails: "Trained sequential LSTM deep learning models over temporal gesture sequences. Designed custom calibration algorithms overcoming non-linear resistive flex characteristics, reaching 95% sensor stability.",
      demoUrl: null,
      repoUrl: "https://github.com/MrinankGaur/FLEX-SENSOR-BASED-GLOVE-FOR-SIGN-LANGUAGE-RECOGNITION-AND-MULTILINGUAL-SPEECH-TRANSLATION"
    },
    boardly: {
      category: "Real-Time Systems & Web Application",
      title: "Boardly — Real-Time Collaborative Whiteboard",
      problem: "Distributed engineering and design teams need immediate, zero-latency shared canvas workspaces with conflict-free object manipulation and persistent state.",
      architecture: `[Next.js Client Canvas & Drawing Engine]
         │
         ▼ (Live Cursor & Object Deltas)
[LiveBlocks WebSocket CRDT Synchronization]
         │
         ├──> Multi-User Conflict Resolution
         ▼
[Convex Reactive Backend & State Storage]
         │
         ├──> Clerk Authentication & Org Management
         ▼
[Persistent Vector Layering & Instant Board Sharing]`,
      techDetails: "Implemented 5+ vector tools (freehand Bezier smoothing, geometry, sticky notes, layers). Leveraged Conflict-free Replicated Data Types (CRDTs) through LiveBlocks for flicker-free concurrent editing with multiple active cursors.",
      demoUrl: "https://boardly24.vercel.app/",
      repoUrl: "https://github.com/MrinankGaur/Boardly"
    },
    anpr: {
      category: "Computer Vision & Edge Computing",
      title: "Automatic Number Plate Recognition (ANPR)",
      problem: "Automated vehicle toll and gated access systems require high-accuracy plate detection without expensive specialized camera infrastructure.",
      architecture: `[ESP32-CAM Remote Video Capture Stream]
         │
         ▼ (HTTP JPEG Frame Acquisition)
[Python OpenCV Image Processing Pipeline]
         │
         ├──> Grayscale, Bilateral Filter & Edge Canny
         ├──> Contour Detection & Aspect Ratio Filtering
         ▼
[EasyOCR Neural Optical Character Recognition]
         │
         ▼ (<2s Recognition Latency, 95% Accuracy)
[Responsive Web Interface with Live Plate Telemetry]`,
      techDetails: "Optimized OpenCV contour extraction with adaptive thresholding to isolate reflective license plates across variable lighting. Integrated EasyOCR with alphanumeric regex post-processing.",
      demoUrl: null,
      repoUrl: "https://github.com/MrinankGaur/Automatic-Number-Plate-Recognition-System"
    },
    mac: {
      category: "VLSI Design & Hardware Architecture",
      title: "High-Speed MAC Unit with Pipeline Architecture",
      problem: "Deep Neural Network (DNN) hardware accelerators demand high-throughput multiply-accumulate operations constrained by clock skew and propagation delays.",
      architecture: `[16-Bit Operand Inputs]
         │
         ▼
[Hyper-Pipelined 4-Bit Multiplier Stage]
         │
         ├──> Deskewing Registers & Pipeline Synchronization
         ▼
[8-Bit Balanced Full-Adder Tree Stage]
         │
         ▼
[Accumulator Stage Operating at 5 GHz Clock Target]
         │
         ▼
[Cadence EDA Simulation & 0.18µm CMOS Synthesis]`,
      techDetails: "Implemented custom RTL in Verilog with delay-balanced full-adder logic. Achieved 5 GHz target clock frequency on 0.18µm CMOS process through hyper-pipelined deskewing registers verified in Cadence EDA.",
      demoUrl: null,
      repoUrl: "https://github.com/MrinankGaur"
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectData[projectId];
    if (!data) return;

    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalProblem.textContent = data.problem;
    modalArchitecture.textContent = data.architecture;
    modalTechDetails.textContent = data.techDetails;

    if (data.demoUrl) {
      modalDemoBtn.href = data.demoUrl;
      modalDemoBtn.style.display = 'inline-flex';
    } else {
      modalDemoBtn.style.display = 'none';
    }

    if (data.repoUrl) {
      modalRepoBtn.href = data.repoUrl;
      modalRepoBtn.style.display = 'inline-flex';
    } else {
      modalRepoBtn.style.display = 'none';
    }

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  document.querySelectorAll('.open-modal-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 4. TAILORED RESUME HUB (Interactive Tab Switcher)
  // --------------------------------------------------------------------------
  const resumeTabs = document.querySelectorAll('.resume-tab-btn');
  const resumePanels = document.querySelectorAll('.resume-content-panel');

  resumeTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetRole = tab.getAttribute('data-role');

      resumeTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      resumePanels.forEach((panel) => {
        if (panel.getAttribute('data-panel') === targetRole) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });

  // --------------------------------------------------------------------------
  // 5. COMMAND PALETTE (Ctrl + K / Cmd + K)
  // --------------------------------------------------------------------------
  const cmdModal = document.getElementById('cmd-modal');
  const cmdTriggerBtn = document.getElementById('cmd-trigger-btn');
  const cmdInput = document.getElementById('cmd-input');
  const cmdList = document.getElementById('cmd-results-list');

  const openCmdPalette = () => {
    if (!cmdModal) return;
    cmdModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (cmdInput) {
      cmdInput.value = '';
      cmdInput.focus();
      filterCmdItems('');
    }
  };

  const closeCmdPalette = () => {
    if (!cmdModal) return;
    cmdModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (cmdTriggerBtn) {
    cmdTriggerBtn.addEventListener('click', openCmdPalette);
  }

  // Keyboard shortcut listener
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && cmdModal.classList.contains('open')) {
        closeCmdPalette();
      } else {
        openCmdPalette();
      }
    } else if (e.key === 'Escape') {
      if (cmdModal && cmdModal.classList.contains('open')) {
        closeCmdPalette();
      }
      if (projectModal && projectModal.classList.contains('open')) {
        closeProjectModal();
      }
    }
  });

  if (cmdModal) {
    cmdModal.addEventListener('click', (e) => {
      if (e.target === cmdModal) closeCmdPalette();
    });
  }

  // Filter items in command palette
  const filterCmdItems = (query) => {
    const term = query.toLowerCase().trim();
    const items = cmdList.querySelectorAll('.cmd-item');
    let hasVisible = false;

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      if (!term || text.includes(term)) {
        item.style.display = 'flex';
        hasVisible = true;
      } else {
        item.style.display = 'none';
      }
    });

    // Reset selection highlight to first visible item
    items.forEach((i) => i.classList.remove('selected'));
    const firstVisible = Array.from(items).find((i) => i.style.display !== 'none');
    if (firstVisible) firstVisible.classList.add('selected');
  };

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      filterCmdItems(e.target.value);
    });

    // Arrow navigation in command palette
    cmdInput.addEventListener('keydown', (e) => {
      const visibleItems = Array.from(cmdList.querySelectorAll('.cmd-item')).filter(
        (i) => i.style.display !== 'none'
      );
      if (!visibleItems.length) return;

      let currentIndex = visibleItems.findIndex((i) => i.classList.contains('selected'));

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex < visibleItems.length - 1) {
          visibleItems[currentIndex]?.classList.remove('selected');
          visibleItems[currentIndex + 1]?.classList.add('selected');
          visibleItems[currentIndex + 1]?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          visibleItems[currentIndex]?.classList.remove('selected');
          visibleItems[currentIndex - 1]?.classList.add('selected');
          visibleItems[currentIndex - 1]?.scrollIntoView({ block: 'nearest' });
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = visibleItems[currentIndex] || visibleItems[0];
        if (selected) selected.click();
      }
    });
  }

  // Execute action on click of command item
  cmdList?.addEventListener('click', (e) => {
    const item = e.target.closest('.cmd-item');
    if (!item) return;

    const action = item.getAttribute('data-action');
    closeCmdPalette();

    switch (action) {
      case 'jump-work':
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-skills':
        document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-experience':
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-resumes':
        document.getElementById('resumes')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'jump-contact':
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'toggle-theme':
        const current = rootElement.getAttribute('data-theme') || 'dark';
        setTheme(current === 'dark' ? 'light' : 'dark');
        break;
      case 'open-cs-resume':
        window.open('CS.pdf', '_blank');
        break;
      case 'open-embedded-resume':
        window.open('EMBEDDED.pdf', '_blank');
        break;
      case 'open-electronics-resume':
        window.open('ELECTRONICS.pdf', '_blank');
        break;
      case 'copy-email':
        copyToClipboard('mrinank2484@gmail.com', 'Email address copied!');
        break;
      case 'open-github':
        window.open('https://github.com/MrinankGaur', '_blank');
        break;
      case 'open-linkedin':
        window.open('https://www.linkedin.com/in/mrinank-gaur-252b53239/', '_blank');
        break;
      case 'open-leetcode':
        window.open('https://leetcode.com/u/mrinankgaur/', '_blank');
        break;
      default:
        break;
    }
  });

  // --------------------------------------------------------------------------
  // 6. 1-CLICK COPY & TOAST NOTIFICATION
  // --------------------------------------------------------------------------
  const toast = document.getElementById('site-toast');
  const toastMessage = document.getElementById('toast-message');
  let toastTimer = null;

  const copyToClipboard = (text, message = 'Copied to clipboard!') => {
    navigator.clipboard.writeText(text).then(
      () => {
        showToast(message);
      },
      () => {
        // Fallback for restricted contexts
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand('copy');
          showToast(message);
        } catch (err) {
          showToast('Failed to copy');
        }
        document.body.removeChild(textarea);
      }
    );
  };

  const showToast = (msg) => {
    if (!toast) return;
    if (toastMessage) toastMessage.textContent = msg;

    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  };

  document.querySelectorAll('.copy-trigger').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Copied to clipboard!';
      copyToClipboard(text, label);
    });
  });

  // --------------------------------------------------------------------------
  // 7. ACTIVE NAVIGATION SCROLL SPY
  // --------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Dynamic Year in Footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
