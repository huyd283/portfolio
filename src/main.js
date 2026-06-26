/**
 * Main JavaScript for Cấn Xuân Thành Portfolio
 * Author: Cấn Xuân Thành
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Loading Screen
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 700);
    }, 1000);
  });

  // 2. Cursor Glow Effect
  const cursorGlow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = `${e.clientX}px`;
    cursorGlow.style.top = `${e.clientY}px`;
  });

  // 4. Navbar Scroll Effect & Active Links
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Sticky Navbar background
    if (window.scrollY > 50) {
      navbar.classList.add('bg-[#f8fafc]/80', 'backdrop-blur-xl', 'py-4', 'shadow-xl');
      navbar.classList.remove('py-6');
    } else {
      navbar.classList.remove('bg-[#f8fafc]/80', 'backdrop-blur-xl', 'py-4', 'shadow-xl');
      navbar.classList.add('py-6');
    }

    // Active Link Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });

    // Back to Top Button
    const backToTop = document.getElementById('back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.remove('translate-y-24', 'opacity-0');
    } else {
      backToTop.classList.add('translate-y-24', 'opacity-0');
    }
  });

  // 5. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuSidebar = document.getElementById('menu-sidebar');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  const openMenu = () => {
    mobileMenu.classList.remove('pointer-events-none');
    menuOverlay.classList.add('opacity-100');
    menuSidebar.classList.remove('translate-x-full');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.add('pointer-events-none');
    menuOverlay.classList.remove('opacity-100');
    menuSidebar.classList.add('translate-x-full');
    document.body.style.overflow = 'auto';
  };

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // 6. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-reveal');
        
        // Trigger skill progress bars
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          bar.style.width = bar.getAttribute('data-width');
        });

        // Trigger counters
        const counters = entry.target.querySelectorAll('.counter');
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const count = +counter.innerText;
          const increment = target / 100;
          
          if (count < target) {
            const updateCount = () => {
              const currentCount = +counter.innerText;
              if (currentCount < target) {
                counter.innerText = Math.ceil(currentCount + increment);
                setTimeout(updateCount, 20);
              } else {
                counter.innerText = target;
              }
            };
            updateCount();
          }
        });
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.classList.remove('hide');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.classList.add('hide');
          }, 400);
        }
      });
    });
  });

  // 8. Project Modal Logic
  const modal = document.getElementById('project-modal');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  const modalTriggers = document.querySelectorAll('.modal-trigger');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalCategory = document.getElementById('modal-category');

  const projectData = {
    '1': {
      title: 'E-commerce Backend API',
      category: 'Web Development',
      desc: 'Hệ thống API hoàn chỉnh cho sàn thương mại điện tử với Node.js, Express và MongoDB. Hỗ trợ xác thực JWT, thanh toán Stripe và quản lý kho hàng.',
      img: 'https://picsum.photos/seed/p1/800/600'
    },
    '2': {
      title: 'Real-time Task Manager',
      category: 'Application',
      desc: 'Ứng dụng quản lý công việc thời gian thực sử dụng Socket.io và React. Cho phép nhiều người dùng cộng tác trên cùng một bảng công việc.',
      img: 'https://picsum.photos/seed/p2/800/600'
    },
    '3': {
      title: 'Modern Portfolio Website',
      category: 'Personal',
      desc: 'Website giới thiệu bản thân với thiết kế hiện đại, tối ưu SEO và tốc độ tải trang. Sử dụng Vanilla JS và Tailwind CSS cho hiệu suất tốt nhất.',
      img: 'https://picsum.photos/seed/p3/800/600'
    }
  };

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const id = trigger.getAttribute('data-project');
      const data = projectData[id];
      
      modalImg.src = data.img;
      modalTitle.innerText = data.title;
      modalDesc.innerText = data.desc;
      modalCategory.innerText = data.category;

      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.querySelector('.relative').classList.remove('scale-90');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.relative').classList.add('scale-90');
    document.body.style.overflow = 'auto';
  };

  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeModal));

  // 9. Form Validation & Toast
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const submitBtn = document.getElementById('submit-btn');

  const checkFormValidity = () => {
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    const emailError = document.getElementById('email-error');
    
    // Email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    
    // Show/hide error message and update border
    if (email && !isEmailValid) {
      emailError.classList.remove('hidden');
      contactForm.email.classList.add('border-red-500');
      contactForm.email.classList.remove('border-blue-100');
    } else {
      emailError.classList.add('hidden');
      contactForm.email.classList.remove('border-red-500');
      contactForm.email.classList.add('border-blue-100');
    }
    
    if (name && isEmailValid && message) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  };

  contactForm.addEventListener('input', checkFormValidity);

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = contactForm.name.value;
    const email = contactForm.email.value;
    const message = contactForm.message.value;

    if (!name || !email || !message) {
      return;
    }

    // Fake Submit
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i> Sending...';
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      // Show Toast
      toast.classList.remove('translate-y-24', 'opacity-0');
      
      // Reset Form
      contactForm.reset();
      checkFormValidity(); // Re-disable button after reset
      submitBtn.innerHTML = originalText;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
      }, 5000);
    }, 1500);
  });

  // 10. Back to Top Click
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // 11. Custom Confirmation Modal for Email and Phone
  const confirmModal = document.getElementById('confirm-modal');
  const confirmTitle = document.getElementById('confirm-title');
  const confirmMessage = document.getElementById('confirm-message');
  const confirmYes = document.getElementById('confirm-yes');
  const confirmNo = document.getElementById('confirm-no');
  let currentAction = null;

  const showConfirm = (title, message, yesText, action) => {
    confirmTitle.innerText = title;
    confirmMessage.innerText = message;
    confirmYes.innerText = yesText;
    currentAction = action;
    confirmModal.classList.remove('opacity-0', 'pointer-events-none');
    confirmModal.querySelector('.relative').classList.remove('scale-90');
    document.body.style.overflow = 'hidden';
  };

  const closeConfirm = () => {
    confirmModal.classList.add('opacity-0', 'pointer-events-none');
    confirmModal.querySelector('.relative').classList.add('scale-90');
    document.body.style.overflow = 'auto';
  };

  document.getElementById('email-trigger').addEventListener('click', () => {
    showConfirm('Gửi Email', 'Bạn có muốn gửi tin nhắn tới tôi?', 'Gửi', () => {
      window.location.href = 'mailto:thanhdiino@gmail.com';
    });
  });

  document.getElementById('phone-trigger').addEventListener('click', () => {
    showConfirm('Gọi điện', 'Bạn có muốn gọi cho tôi?', 'Có', () => {
      window.location.href = 'tel:0366031000';
    });
  });

  confirmYes.addEventListener('click', () => {
    if (currentAction) currentAction();
    closeConfirm();
  });

  confirmNo.addEventListener('click', closeConfirm);
  confirmModal.querySelector('.absolute').addEventListener('click', closeConfirm);
});
