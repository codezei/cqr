(function () {
    'use strict';

    document.addEventListener("DOMContentLoaded", function () {
      navbar();
      header();
      smoothScroll();
      initScrollSpy('.sidebar-nav', {
        offset: 110,
        activeClass: 'active'
      });
      AOS.init({
        once: true,
        duration: 800
      });
    });

    function navbar() {
      var navigation = document.querySelector(".navigation");
      var navigationButton = document.querySelector(".js-navigation-btn");
      if (!navigationButton) return;
      navigationButton.addEventListener("click", function () {
        navigation.classList.toggle("open");
      });
    }

    function header() {
      var header = document.querySelector("header");
      checkHeaderOffset();
      document.addEventListener("scroll", function () {
        checkHeaderOffset();
      });

      function checkHeaderOffset() {
        var offsetTop = document.documentElement.scrollTop;

        if (offsetTop > 1) {
          header.classList.add("active");
        } else {
          header.classList.remove("active");
        }
      }
    }

    function smoothScroll() {
      var linkNav = document.querySelectorAll('[href^="#"]');
      var headerHeight = document.querySelector(".header").getBoundingClientRect().height;
      var V = 0.2;

      for (var i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener("click", function (e) {
          e.preventDefault();
          scroll();
        });
      }

      function scroll() {
        var w = window.pageYOffset;
        var hash = this.href.replace(/[^#]*(.*)/, "$1");
        var tar = document.querySelector(hash);
        var t = tar.getBoundingClientRect().top - headerHeight;
        var start = null;
        requestAnimationFrame(step);

        function step(time) {
          if (start === null) {
            start = time;
          }

          var progress = time - start,
              r = t < 0 ? Math.max(w - progress / V, w + t) : Math.min(w + progress / V, w + t);
          window.scrollTo(0, r);

          if (r != w + t) {
            requestAnimationFrame(step);
          } else {
            location.hash = hash;
          }
        }

        if (t > 1 || t < -1) {
          requestAnimationFrame(step);
        }
      }
    }

    function initScrollSpy(navSelector) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var nav = document.querySelector(navSelector);

      if (!nav) {
        console.warn("ScrollSpy: Navigation not found.");
        return;
      }

      var links = Array.from(nav.querySelectorAll('a[href^="#"]'));
      var sections = links.map(function (link) {
        return document.querySelector(link.getAttribute("href"));
      });
      var offset = options.offset || 0;
      var activeClass = options.activeClass || "active";

      if (!links.length || !sections.length) {
        console.warn("ScrollSpy: Links or sections not found.");
        return;
      }

      function handleScroll() {
        var scrollPosition = window.scrollY + offset;
        sections.forEach(function (section, index) {
          var sectionTop = section.offsetTop;
          var sectionBottom = sectionTop + section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            setActiveLink(links[index]);
          }
        });
      }

      function setActiveLink(activeLink) {
        links.forEach(function (link) {
          return link.classList.remove(activeClass);
        });

        if (activeLink) {
          activeLink.classList.add(activeClass);
        }
      }

      window.addEventListener("scroll", handleScroll);
      handleScroll();
    }

}());
//# sourceMappingURL=main.js.map
