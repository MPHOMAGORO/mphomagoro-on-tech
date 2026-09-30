/* =========================================================
   MPHOMAGORO.COM — standalone HTML version
   Small, dependency-free behaviour for the static pages.
   ========================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;

  /* -------------------------------------------------------
     Theme: system → light → dark → system
     The initial theme is applied by an inline script in <head>
     so the page never flashes the wrong colours.
     ------------------------------------------------------- */

  var THEME_KEY = 'theme';
  var THEME_ORDER = ['system', 'light', 'dark'];
  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function readChoice() {
    try {
      var stored = localStorage.getItem(THEME_KEY);
      return stored === 'light' || stored === 'dark' ? stored : 'system';
    } catch (error) {
      return 'system';
    }
  }

  function writeChoice(choice) {
    try {
      if (choice === 'system') {
        localStorage.removeItem(THEME_KEY);
      } else {
        localStorage.setItem(THEME_KEY, choice);
      }
    } catch (error) {
      // Storage can be unavailable (private mode); the choice still applies to this page.
    }
  }

  function applyTheme(choice) {
    var theme = choice === 'system' ? (darkQuery.matches ? 'dark' : 'light') : choice;

    root.setAttribute('data-theme', theme);
    root.setAttribute('data-theme-choice', choice);

    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      var label = 'Switch between dark and light mode (currently ' + choice + ' mode)';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', choice + ' mode');
    });
  }

  var themeChoice = readChoice();
  applyTheme(themeChoice);

  document.querySelectorAll('.theme-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = THEME_ORDER[(THEME_ORDER.indexOf(themeChoice) + 1) % THEME_ORDER.length];
      themeChoice = next;
      writeChoice(next);
      applyTheme(next);
    });
  });

  darkQuery.addEventListener('change', function () {
    if (themeChoice === 'system') {
      applyTheme('system');
    }
  });

  /* -------------------------------------------------------
     Mobile navigation drawer
     ------------------------------------------------------- */

  var toggle = document.querySelector('.navbar__toggle');
  var sidebar = document.getElementById('navbar-sidebar');
  var backdrop = document.querySelector('.navbar-sidebar__backdrop');
  var sidebarItems = document.querySelector('.navbar-sidebar__items');
  var hasSecondary = !!document.querySelector('.navbar-sidebar__item--secondary');

  function setPanel(secondary) {
    if (!sidebarItems) {
      return;
    }

    sidebarItems.classList.toggle('navbar-sidebar__items--show-secondary', secondary);
  }

  function openNav() {
    body.classList.add('is-nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    sidebar.removeAttribute('inert');
    setPanel(hasSecondary);

    // Wait a frame so the drawer is no longer visibility: hidden before focusing into it.
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        var firstFocusable = sidebar.querySelector('.navbar-sidebar__close');
        if (firstFocusable) {
          firstFocusable.focus();
        }
      });
    });
  }

  function closeNav(returnFocus) {
    if (!body.classList.contains('is-nav-open')) {
      return;
    }

    body.classList.remove('is-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    sidebar.setAttribute('inert', '');

    if (returnFocus) {
      toggle.focus();
    }
  }

  if (toggle && sidebar) {
    sidebar.setAttribute('inert', '');

    toggle.addEventListener('click', openNav);

    sidebar.querySelector('.navbar-sidebar__close').addEventListener('click', function () {
      closeNav(true);
    });

    if (backdrop) {
      backdrop.addEventListener('click', function () {
        closeNav(true);
      });
    }

    var back = sidebar.querySelector('.navbar-sidebar__back');
    if (back) {
      back.addEventListener('click', function () {
        setPanel(false);
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeNav(true);
      }
    });

    window.matchMedia('(min-width: 997px)').addEventListener('change', function (event) {
      if (event.matches) {
        closeNav(false);
      }
    });
  }

  /* -------------------------------------------------------
     Docs sidebar categories
     ------------------------------------------------------- */

  document.querySelectorAll('.menu__link--sublist').forEach(function (button) {
    button.addEventListener('click', function () {
      var expanded = button.getAttribute('aria-expanded') === 'true';
      var list = document.getElementById(button.getAttribute('aria-controls'));

      button.setAttribute('aria-expanded', String(!expanded));
      if (list) {
        list.hidden = expanded;
      }
    });
  });

  /* -------------------------------------------------------
     Share button (articles)
     ------------------------------------------------------- */

  document.querySelectorAll('.share-button').forEach(function (button) {
    var label = button.querySelector('.share-button__label');
    var resetTimer;

    button.addEventListener('click', function () {
      var url = window.location.href;
      var title = button.getAttribute('data-title') || document.title;

      if (navigator.share) {
        navigator.share({ title: title, url: url }).catch(function (error) {
          // Cancelling the native share sheet is not an error.
          if (error && error.name !== 'AbortError') {
            console.error('Unable to share page:', error);
          }
        });
        return;
      }

      if (!navigator.clipboard) {
        return;
      }

      navigator.clipboard.writeText(url).then(function () {
        label.textContent = 'Copied';
        clearTimeout(resetTimer);
        resetTimer = setTimeout(function () {
          label.textContent = 'Share';
        }, 2000);
      }).catch(function (error) {
        console.error('Unable to share page:', error);
      });
    });
  });

  /* -------------------------------------------------------
     Tabs
     ------------------------------------------------------- */

  document.querySelectorAll('.tabs-container').forEach(function (container) {
    var tabs = Array.prototype.slice.call(container.querySelectorAll('[role="tab"]'));

    function select(tab, focus) {
      tabs.forEach(function (item) {
        var selected = item === tab;
        item.setAttribute('aria-selected', String(selected));
        item.setAttribute('tabindex', selected ? '0' : '-1');
        item.classList.toggle('tabs__item--active', selected);
        document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
      });

      if (focus) {
        tab.focus();
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        var next = null;

        if (event.key === 'ArrowRight') {
          next = tabs[(index + 1) % tabs.length];
        } else if (event.key === 'ArrowLeft') {
          next = tabs[(index - 1 + tabs.length) % tabs.length];
        } else if (event.key === 'Home') {
          next = tabs[0];
        } else if (event.key === 'End') {
          next = tabs[tabs.length - 1];
        } else if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select(tab, false);
          return;
        }

        if (next) {
          event.preventDefault();
          select(next, true);
        }
      });
    });
  });

  /* -------------------------------------------------------
     Table of contents highlight
     ------------------------------------------------------- */

  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll('.toc .table-of-contents__link')
  );

  if (tocLinks.length) {
    var headings = tocLinks.map(function (link) {
      return document.getElementById(decodeURIComponent(link.hash.slice(1)));
    });

    var ticking = false;

    function highlightToc() {
      ticking = false;

      var offset = parseInt(getComputedStyle(root).getPropertyValue('--navbar-height'), 10) || 68;
      var activeIndex = -1;

      headings.forEach(function (heading, index) {
        if (heading && heading.getBoundingClientRect().top <= offset + 10) {
          activeIndex = index;
        }
      });

      if (activeIndex === -1 && headings[0] && headings[0].getBoundingClientRect().top < window.innerHeight / 2) {
        activeIndex = 0;
      }

      tocLinks.forEach(function (link, index) {
        link.classList.toggle('table-of-contents__link--active', index === activeIndex);
      });
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(highlightToc);
      }
    }, { passive: true });

    highlightToc();
  }

  /* -------------------------------------------------------
     Back to top (guides)
     ------------------------------------------------------- */

  var backToTop = document.querySelector('.back-to-top');

  if (backToTop) {
    var lastScroll = window.scrollY;

    window.addEventListener('scroll', function () {
      var current = window.scrollY;
      var visible = current > 300 && current < lastScroll;
      backToTop.classList.toggle('back-to-top--visible', visible);
      lastScroll = current;
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0 });
    });
  }

  /* -------------------------------------------------------
     Footer year
     ------------------------------------------------------- */

  document.querySelectorAll('[data-current-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* -------------------------------------------------------
     Google Analytics — production domain only
     (matches the gtag configuration in docusaurus.config.ts)
     ------------------------------------------------------- */

  if (window.location.hostname === 'mphomagoro.com') {
    var GA_ID = 'G-8BQ8W900ZZ';
    var gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(gaScript);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }
})();
