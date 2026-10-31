/**
 * TRƯỜNG MẦM NON VIỆT Ý & BÁN TRÚ TK ACADEMY
 * Main Application Logic & Interactivity
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function () {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  // 2. Header Scroll Effect
  const header = document.querySelector('header');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header?.classList.add('header-scrolled');
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none');
    } else {
      header?.classList.remove('header-scrolled');
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none');
    }
  });

  // 3. Smooth Scroll Helper
  window.scrollToSection = function (id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4. Initialize Swiper for Overview (Uơm mầm)
  if (document.querySelector('.uommam-swiper')) {
    new Swiper('.uommam-swiper', {
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.uommam-pagination',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 1.2, spaceBetween: 12 },
        640: { slidesPerView: 2, spaceBetween: 16 },
        768: { slidesPerView: 1, spaceBetween: 0 },
      },
    });
  }

  // 5. Initialize Swiper for Activities (Ưu điểm)
  if (document.querySelector('.swiper-activities')) {
    new Swiper('.swiper-activities', {
      slidesPerView: 1,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.activities-pagination',
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        1024: { slidesPerView: 3, spaceBetween: 24 },
      },
    });
  }

  // 6. Initialize Swiper for Facilities (Cơ sở vật chất)
  if (document.querySelector('.swiper-campus-full')) {
    new Swiper('.swiper-campus-full', {
      loop: true,
      speed: 700,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: '.campus-next',
        prevEl: '.campus-prev',
      },
      pagination: {
        el: '.campus-pagination',
        clickable: true,
      },
    });
  }

  // 7. Initialize Swiper for Classes (Các lớp học)
  if (document.querySelector('.swiper-classes')) {
    new Swiper('.swiper-classes', {
      loop: true,
      spaceBetween: 30,
      navigation: {
        nextEl: '.class-next',
        prevEl: '.class-prev',
      },
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  // 8. Lead Registration Form Handler
  const leadForms = document.querySelectorAll('.admissions-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalParentName = document.getElementById('modal-parent-name');
  const modalPhone = document.getElementById('modal-phone');

  leadForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const name = formData.get('HoVaTen')?.toString().trim();
      const age = formData.get('DoTuoi')?.toString().trim();
      const campus = formData.get('CoSoQuanTam')?.toString();
      const program = formData.get('ChuongTrinh')?.toString();
      const phone = formData.get('SoDienThoai')?.toString().trim();
      const email = formData.get('Email')?.toString().trim() || 'Chưa cung cấp';

      if (!name || !phone) {
        alert('Phụ huynh vui lòng nhập đầy đủ Họ Tên và Số Điện Thoại để trường liên hệ tư vấn ạ!');
        return;
      }

      // Save to localStorage
      const leads = JSON.parse(localStorage.getItem('viety_leads') || '[]');
      const newLead = {
        name,
        age,
        campus,
        program,
        phone,
        email,
        createdAt: new Date().toLocaleString('vi-VN'),
      };
      leads.push(newLead);
      localStorage.setItem('viety_leads', JSON.stringify(leads));

      // Show success modal
      if (modalParentName) modalParentName.textContent = name;
      if (modalPhone) modalPhone.textContent = phone;
      if (successModal) {
        successModal.classList.remove('hidden');
        successModal.classList.add('flex');
      }

      form.reset();
    });
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', function () {
      successModal.classList.add('hidden');
      successModal.classList.remove('flex');
    });

    successModal.addEventListener('click', function (e) {
      if (e.target === successModal) {
        successModal.classList.add('hidden');
        successModal.classList.remove('flex');
      }
    });
  }

  // 9. Back to Top Click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
