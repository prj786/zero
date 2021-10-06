import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
gsap.registerPlugin(CustomEase);

export default function Navbar() {
  try {
    Hamburger();
  } catch (error) {
  }
}

function Hamburger() {
  let ishamburgerOpen = false;

  const tlHamburger = gsap.timeline({
    paused: true,
    defaults: {
      ease: CustomEase.create('custom', 'M0,0,C0.802,0,0.2,1,1,1'),
      duration: 1.0
    }
  });

  tlHamburger.set('body', {
    overflowY: 'hidden'
  });

  tlHamburger.set('.navbar-menu', {
    display: 'block'
  });

  tlHamburger.to('.navbar-hamburger-line-1', {
    rotate: 45,
    y: 5
  });

  tlHamburger.to('.navbar-hamburger-line-2', {
    rotate: -45,
    y: -5
  }, 0);

  tlHamburger.to('.navbar-menu', {
    x: 0
  }, 0);

  const hamburger = document.querySelector('.navbar-hamburger');

  hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    if (ishamburgerOpen === false) {
      hamburgerOpen();
    } else {
      hamburgerClose();
    }
  });

  function hamburgerOpen() {
    tlHamburger.play();
    ishamburgerOpen = true;
  }

  function hamburgerClose() {
    tlHamburger.reverse();
    ishamburgerOpen = false;
  }

  gsap.utils.toArray('.navbar-menu-item-link, .logo').forEach((el, i) => {
    el.addEventListener('click', (e) => {
      hamburgerClose();
    });
  });
}
