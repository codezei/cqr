document.addEventListener("DOMContentLoaded", function () {
    navbar();
    header();
    smoothScroll();
    initScrollSpy('.sidebar-nav', {
        offset: 110,
        activeClass: 'active',
    });
    AOS.init({once: true, duration: 800});
});

function navbar() {
    const navigation = document.querySelector(".navigation");
    const navigationButton = document.querySelector(".js-navigation-btn");
    if (!navigationButton) return;
    navigationButton.addEventListener("click", function () {
        navigation.classList.toggle("open");
    });
}

function header() {
    const header = document.querySelector("header");
    checkHeaderOffset();
    document.addEventListener("scroll", function () {
        checkHeaderOffset();
    });
    function checkHeaderOffset() {
        let offsetTop = document.documentElement.scrollTop;
        if (offsetTop > 1) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }
}
function smoothScroll() {
    let linkNav = document.querySelectorAll('[href^="#"]');
    let headerHeight = document
        .querySelector(".header")
        .getBoundingClientRect().height;
    let V = 0.2;
    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener("click", function (e) {
            e.preventDefault(); 
            scroll()
        });
    }

    function scroll() {
        let w = window.pageYOffset; 
        let hash = this.href.replace(/[^#]*(.*)/, "$1");
        let tar = document.querySelector(hash); 
        let t = tar.getBoundingClientRect().top - headerHeight;
        let start = null;

        requestAnimationFrame(step); 
        function step(time) {
            if (start === null) {
                start = time;
            }
            var progress = time - start,
                r =
                    t < 0
                        ? Math.max(w - progress / V, w + t)
                        : Math.min(w + progress / V, w + t);
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

function initScrollSpy(navSelector, options = {}) {
    const nav = document.querySelector(navSelector);
    if (!nav) {
        console.warn("ScrollSpy: Navigation not found.");
        return;
    }

    const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    const sections = links.map((link) =>
        document.querySelector(link.getAttribute("href"))
    );
    const offset = options.offset || 0; 
    const activeClass = options.activeClass || "active"; 

    if (!links.length || !sections.length) {
        console.warn("ScrollSpy: Links or sections not found.");
        return;
    }

    function handleScroll() {
        const scrollPosition = window.scrollY + offset;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                setActiveLink(links[index]);
            }
        });
    }

    function setActiveLink(activeLink) {
        links.forEach((link) => link.classList.remove(activeClass));
        if (activeLink) {
            activeLink.classList.add(activeClass);
        }
    }
    window.addEventListener("scroll", handleScroll);

    handleScroll();
}
