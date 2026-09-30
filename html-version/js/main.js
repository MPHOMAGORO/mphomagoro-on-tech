/* =========================================================
   MPHO MAGORO — ON TECH
   Small, dependency-free behaviour for the static pages.
   ========================================================= */

(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* -------------------------------------------------------
     Theme — dark by default, light on request.
     The initial theme is applied by an inline script in <head>.
     ------------------------------------------------------- */

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function syncThemeButtons() {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    document.querySelectorAll('.theme-toggle').forEach(function (button) {
      button.setAttribute('aria-label', 'Switch to ' + next + ' theme');
      button.setAttribute('title', 'Switch to ' + next + ' theme');
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (button) {
    button.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch (error) {
        // Storage can be unavailable; the theme still applies to this page.
      }
      syncThemeButtons();
    });
  });

  syncThemeButtons();

  /* -------------------------------------------------------
     Header border once the page scrolls
     ------------------------------------------------------- */

  var header = document.querySelector('.site-header');

  function onScrollHeader() {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
  }

  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();

  /* -------------------------------------------------------
     Mobile menu
     ------------------------------------------------------- */

  var menuToggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open, returnFocus) {
    if (!menuToggle || !menu) {
      return;
    }

    body.classList.toggle('is-menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.querySelector('.menu-toggle__label').textContent = open ? 'Close' : 'Menu';

    if (open) {
      menu.removeAttribute('inert');
      window.requestAnimationFrame(function () {
        var first = menu.querySelector('a, button');
        if (first) {
          first.focus();
        }
      });
    } else {
      menu.setAttribute('inert', '');
      if (returnFocus) {
        menuToggle.focus();
      }
    }
  }

  if (menuToggle && menu) {
    menu.setAttribute('inert', '');

    menuToggle.addEventListener('click', function () {
      setMenu(!body.classList.contains('is-menu-open'), false);
    });

    // Close after choosing an in-page link
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false, false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && body.classList.contains('is-menu-open')) {
        setMenu(false, true);
      }
    });

    window.matchMedia('(min-width: 901px)').addEventListener('change', function (event) {
      if (event.matches) {
        setMenu(false, false);
      }
    });
  }

  /* -------------------------------------------------------
     Home: highlight the nav item for the section in view
     ------------------------------------------------------- */

  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('[data-spy]'));

  if (spyLinks.length) {
    var spyTicking = false;

    // The active item is the tracked section that spans the middle of the viewport.
    function updateSpy() {
      spyTicking = false;
      var middle = window.innerHeight * 0.5;

      spyLinks.forEach(function (link) {
        var target = document.getElementById(link.getAttribute('data-spy'));
        var rect = target ? target.getBoundingClientRect() : null;
        var active = !!rect && rect.top <= middle && rect.bottom > middle;
        link.classList.toggle('is-active', active);
      });
    }

    window.addEventListener('scroll', function () {
      if (!spyTicking) {
        spyTicking = true;
        window.requestAnimationFrame(updateSpy);
      }
    }, { passive: true });

    updateSpy();
  }

  /* -------------------------------------------------------
     Reveal on scroll (content is visible without JavaScript)
     ------------------------------------------------------- */

  var revealItems = document.querySelectorAll('[data-reveal]');

  if (revealItems.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* -------------------------------------------------------
     Architecture diagram: a request moves through the tiers
     while the diagram is on screen.
     ------------------------------------------------------- */

  var arch = document.querySelector('.arch');

  if (arch && 'IntersectionObserver' in window && !reduceMotion.matches) {
    var steps = Array.prototype.slice.call(arch.querySelectorAll('[data-step]'));
    var stepTimer = null;
    var stepIndex = 0;

    function tick() {
      var active = Number(steps[stepIndex].getAttribute('data-step'));
      steps.forEach(function (node) {
        node.classList.toggle('is-active', Number(node.getAttribute('data-step')) === active);
      });
      stepIndex = (stepIndex + 1) % steps.length;
    }

    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        arch.classList.toggle('is-live', entry.isIntersecting);

        if (entry.isIntersecting && !stepTimer) {
          tick();
          stepTimer = window.setInterval(tick, 1100);
        } else if (!entry.isIntersecting && stepTimer) {
          window.clearInterval(stepTimer);
          stepTimer = null;
          steps.forEach(function (node) {
            node.classList.remove('is-active');
          });
        }
      });
    }, { threshold: 0.35 }).observe(arch);
  }

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
        label.textContent = 'Link copied';
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
     Table of contents: mark the section being read
     ------------------------------------------------------- */

  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc .toc__link'));

  if (tocLinks.length) {
    var headings = tocLinks.map(function (link) {
      return document.getElementById(decodeURIComponent(link.hash.slice(1)));
    });

    var ticking = false;

    function highlightToc() {
      ticking = false;

      var offset = (header ? header.offsetHeight : 64) + 32;
      var activeIndex = -1;

      headings.forEach(function (heading, index) {
        if (heading && heading.getBoundingClientRect().top <= offset) {
          activeIndex = index;
        }
      });

      tocLinks.forEach(function (link, index) {
        var active = index === activeIndex;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
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
     Guides navigation categories
     ------------------------------------------------------- */

  document.querySelectorAll('.guide-nav__link--category').forEach(function (button) {
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
     Footer year
     ------------------------------------------------------- */

  document.querySelectorAll('[data-current-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  /* -------------------------------------------------------
     Google Analytics — production domain only
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
