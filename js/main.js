/**
 * C&Cウェルフェア Webサイト
 * 共通JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- モバイルメニュー ---
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const overlay = document.querySelector('.mobile-overlay');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      if (overlay) overlay.classList.toggle('is-open');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // オーバーレイクリックで閉じる
    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    // ESCキーで閉じる
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMenu();
      }
    });

    // モバイルナビ内リンククリックで閉じる
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  function closeMenu() {
    if (mobileNav) mobileNav.classList.remove('is-open');
    if (menuToggle) {
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // --- ヘッダースクロール効果 ---
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 10) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    });
  }

  // --- 現在ページのナビハイライト ---
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.global-nav__link, .mobile-nav__list a').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('is-current');
    }
  });
});
