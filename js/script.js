/**
 * 創価大学 町田特設LP 共通JavaScript (まちハロ風スタイル対応)
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. モバイルナビゲーション（ハンバーガーメニュー）
  const hamburger = document.getElementById('hamburger');
  const headerNav = document.getElementById('headerNav');

  if (hamburger && headerNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('active');
      headerNav.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // リンククリック時に閉じる
    const navLinks = headerNav.querySelectorAll('.header__nav-link, .header__nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        headerNav.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
      });
    });
  }

  // 2. FAQ アコーディオン開閉
  const faqCards = document.querySelectorAll('.faq-card');
  faqCards.forEach(card => {
    const question = card.querySelector('.faq-q');
    const answer = card.querySelector('.faq-a');

    if (question && answer) {
      question.addEventListener('click', () => {
        const isOpen = card.classList.contains('active');

        // 他の開いているカードを閉じる
        faqCards.forEach(otherCard => {
          if (otherCard !== card) {
            otherCard.classList.remove('active');
            const otherA = otherCard.querySelector('.faq-a');
            if (otherA) otherA.style.maxHeight = null;
          }
        });

        if (isOpen) {
          card.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          card.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // 3. スムーススクロール（ハッシュリンク）
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // 4. 先輩ストーリーのカテゴリフィルター
  const tabBtns = document.querySelectorAll('.tab-btn');
  const videoCards = document.querySelectorAll('.video-card-item');

  if (tabBtns.length > 0 && videoCards.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        videoCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }
});
