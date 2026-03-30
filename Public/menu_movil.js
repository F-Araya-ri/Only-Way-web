(function () {
      document.addEventListener("DOMContentLoaded", () => {
        const mobileMenu = document.getElementById('mobile-menu');
        const menuOverlay = document.getElementById('menu-overlay');
        const menuPanel = document.getElementById('menu-panel');
        const openBtn = document.getElementById('mobile-menu-button');
        const closeBtn = document.getElementById('close-menu');

        if (!mobileMenu || !openBtn) return; // Si no existen, el script se detiene silenciosamente

        const toggleMenu = (isOpen) => {
          if (isOpen) {
            mobileMenu.classList.remove('invisible');
            setTimeout(() => {
              menuOverlay.classList.replace('opacity-0', 'opacity-100');
              menuPanel.classList.replace('translate-x-full', 'translate-x-0');
            }, 10);
            document.body.style.overflow = 'hidden';
          } else {
            menuOverlay.classList.replace('opacity-100', 'opacity-0');
            menuPanel.classList.replace('translate-x-0', 'translate-x-full');
            setTimeout(() => {
              mobileMenu.classList.add('invisible');
            }, 300);
            document.body.style.overflow = '';
          }
        };

        openBtn.addEventListener('click', () => toggleMenu(true));
        if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
        if (menuOverlay) menuOverlay.addEventListener('click', () => toggleMenu(false));

        // Cerrar al hacer click en links
        const navLinks = menuPanel.querySelectorAll('a');
        navLinks.forEach(link => {
          link.addEventListener('click', () => toggleMenu(false));
        });
      });
    })();