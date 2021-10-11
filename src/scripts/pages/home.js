import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swiper, { EffectCreative } from 'swiper';
import Hammer from '@egjs/hammerjs';
Swiper.use([EffectCreative]);
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

export default class Home {
  constructor() {
    this.DOM = {
      slider: document.querySelector('.slider'),
      navslider: document.querySelector('.nav-slider'),
      navitems: [...document.querySelectorAll('.nav-item')],
      showmorebtn: [...document.querySelectorAll('.slide-btn')]
    };

    this.swiper = new Swiper(this.DOM.slider, {
      loop: true,
      grabCursor: true,
      effect: 'creative',
      speed: 800,
      creativeEffect: {
        prev: {
          translate: [0, 0, -100]
        },
        next: {
          translate: ['100%', 0, 0]
        }
      },
      on: {
        init: function() {
          const navitems = [...document.querySelectorAll('.nav-item')];
          const getWidth = navitems[0].offsetWidth;
          const getLeft = navitems[0].offsetLeft;
          const getColor = navitems[0].dataset.color;

          gsap.to('.nav-slider', {
            opacity: 1,
            duration: 0.5
          });

          gsap.to('.nav-pad', {
            width: getWidth,
            left: getLeft,
            background: getColor
          });
        }
      }
    });

    this.init();
  }

  init() {
    this.slider();
    this.onscroll();
    this.nextchapter();
    this.showmore();
    this.scrollup();
    this.onresize();
  }

  slider() {
    const elSwiper = this.swiper;
    const getNavitems = this.DOM.navitems;
    const elNextchaptertext = document.querySelector('.nextchapter-text');
    const oldNextchaptertext = elNextchaptertext.textContent;
    const restartNextchaptertext = 'Keep scrolling to restart';

    function padChange(el) {
      const getWidth = el.offsetWidth;
      const getLeft = el.offsetLeft;
      const getColor = el.dataset.color;

      gsap.to('.nav-pad', {
        width: getWidth,
        left: getLeft,
        background: getColor
      });
    }

    elSwiper.on('slideChange', function () {
      const getIndex = this.realIndex;
      const getActive = getNavitems[getIndex];
      const getLastslide = getNavitems.length - 1;

      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

      if (getIndex === getLastslide) {
        elNextchaptertext.textContent = restartNextchaptertext;
      } else {
        elNextchaptertext.textContent = oldNextchaptertext;
      }

      getNavitems.forEach(el => {
        el.classList.remove('active');
      });

      getActive.classList.add('active');

      padChange(getActive);

      gsap.set('.content-wrap', {
        display: 'none'
      });

      gsap.set(`.content-${getIndex}`, {
        display: 'block'
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });

    getNavitems.forEach(el => {
      el.addEventListener('click', function(e) {
        const getIndex = parseInt(e.currentTarget.dataset.index);
        elSwiper.slideToLoop(getIndex);
      });
    });
  }

  scrollup() {
    console.log("scrollup")
    const elSwiper = this.swiper;

    //active only on mobile to go to the previous slide when you drag/pan scroll up at the top
    const touchGesture = new Hammer(window, {
      touchAction: 'auto'
    });

    touchGesture.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
    touchGesture.on('pandown', function(e) {
      console.log("touchGesture on pandown e:",e)   //never triggered
      if (e.target.scrollY === 0) {
        setTimeout(() => {
          console.log("launching previous slide")
          return elSwiper.slidePrev();
        }, 150);
      }
    });
    
    window.addEventListener('wheel', (e) => {
      if (e.view.scrollY === 0) {
        if (e.deltaY < 0) {
          setTimeout(() => {
            return elSwiper.slidePrev();
          }, 150);
        }
      }

      /* The bug is here in the detection of Swiping left and right
      // this is used only on the desktop so we can get rid of it - on mobile we have the pan behaviur captured by touchGesture
      // the problem appaars only with trackpads where the deltaX or delta Y isn't as precise than with a mouseWheel
      // because when you are moving the mouse on a trackpad you are always going a bit in all directions
      // normalizing and chekcing which among all directions is the strongest works up to a certain point, 
      // because if you keep moving the mouse will still capture some different directions...
      // there are possible solutions but since this is not an important interaction we can safely delete it
      if (e.deltaX > 0) {
        setTimeout(() => {
          elSwiper.slideNext();
        }, 150);
      } else if (e.deltaX < 0) {
        setTimeout(() => {
          elSwiper.slidePrev();
        }, 150);
      }
      //*/
    });
  }

    // BB ATTEMPT TO SOLVE BUG
    // TODO explore this to normalize Mousewheel speeds across browsers
    // https://stackoverflow.com/questions/5527601/normalizing-mousewheel-speed-across-browsers
    /*
    scrollup() {
      console.log("scrollup")
      const elSwiper = this.swiper;
  
      //active only on mobile to go to the previous slide when you drag/pan scroll up at the top
      const touchGesture = new Hammer(window, {
        touchAction: 'auto'
      });
  
      touchGesture.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
      touchGesture.on('pandown', function(e) {
        console.log("touchGesture on pandown e:",e)   //never triggered
        if (e.target.scrollY === 0) {
          setTimeout(() => {
            console.log("launching previous slide")
            return elSwiper.slidePrev();
          }, 150);
        }
      });

    //*
    function detectRealDirection(e) {
      //console.log("direction e: ",e)
      console.log("direction. \te.wheelDeltaX: " + e.wheelDeltaX + "\te.wheelDeltaY: " + e.wheelDeltaY )
      //console.log("direction \te.deltaX: " + e.deltaX + "\tdeltaY: "+ e.deltaY)
      let x = Math.abs(e.wheelDeltaX)
      let y = Math.abs(e.wheelDeltaY)
      let dir = ""
      if(x > y && e.deltaX < 0) dir = "LEFT"
      if(x > y && e.deltaX > 0) dir = "RIGHT"
      if(x < y && e.deltaY > 0) dir = "DOWN"
      if(x < y && e.deltaY < 0) dir = "UP"
      console.log("swiping "+dir )//+ " e.deltaX: " + e.deltaX + " - deltaY: "+ e.deltaY)
      return dir
    }

    let launchedDir = false
    //*
    window.addEventListener('wheel', (e) => {
      //console.log("window.wheel e: ",e)
      //console.log("window.wheel e.deltaY: ",e.deltaY)
      let dir = detectRealDirection(e)
      //console.log("window.wheel e.movementX: ",e.movementX) - always 0 why?

      //When it touches the top show the previous slide - this works
      if (dir == "UP" && e.view.scrollY === 0) {
        //if (e.deltaY < 0) {
        //if (dir == "UP") {
          setTimeout(() => {
            return elSwiper.slidePrev();
          }, 150);
        //}
      }

      ///*  Still causes some problems from time to time
      if (dir == "RIGHT" && !launchedDir) {
        launchedDir = true;
        setTimeout(() => {
          elSwiper.slideNext();
          launchedDir = false
          console.log("launchedDir 1: " + launchedDir)
        }, 150);
        
      
      } else if (dir == "LEFT" && !launchedDir) {
        launchedDir = true;
        setTimeout(() => {
          console.log("launching slidePrev")
          elSwiper.slidePrev();
          launchedDir = false
          console.log("launchedDir 1: " + launchedDir)
        }, 150);

        // this should avoid picking the LEFT or right if I'm going down
      } else if (dir == "DOWN" && !launchedDir) {
        launchedDir = true;
        setTimeout(() => { launchedDir = false });
      }
      //*/

      /*
      //when I scroll Sideways - show the next or previous slider
      if (e.deltaX > 0) {
        console.log("launch timeout to launch next slide")
        setTimeout(() => {
          elSwiper.slideNext();
        }, 150);

        // this causes problem because at the beginning the e.deltaX is already -0 or -1 
        // changing it to -2 or -3 to add a threshold doesn't work either
      }  else if (e.deltaX < 0) {
        //else if (e.deltaX < -2) {  //not even this works
        setTimeout(() => {
          console.log("launching slidePrev")
          elSwiper.slidePrev();
        }, 150);
      }
      //* /
    });
    //* /
  }
  //*/

  onscroll() {
    // Below slider
    const tlIntro = gsap.timeline({
      scrollTrigger: {
        trigger: '#intro',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    tlIntro.to('#intro', {
      opacity: 0,
      scale: 0.9
    });
  }

  nextchapter() {
    console.log("nextChapter");
    let isNext = false;
    const elSwiper = this.swiper;

    const tlNextchapter = gsap.timeline({
      paused: true,
      defaults: {
        ease: 'none'
      },
      scrollTrigger: {
        trigger: '#content',
        start: 'bottom bottom',
        end: '+=130%', // edit here to spacer
        scrub: true,
        pin: true
      },
      onStart: function() {
        isNext = false;
      }
    });

    tlNextchapter.to('.nextchapter-fill', {
      scaleX: 1
    });

    tlNextchapter.to('#nextchapter, #content', {
      opacity: 0,
      onComplete: function() {
        if (isNext) {
          return;
        }

        setTimeout(() => {
          elSwiper.slideNext(0);

          gsap.set('body', {
            position: 'fixed',
            overflowY: 'scroll'
          });

          gsap.set('.slider-master', {
            xPercent: 120
          });

          gsap.to('.slider-master', {
            xPercent: 0,
            ease: 'expo.out'
          });

          elSwiper.disable();

          setTimeout(() => {
            gsap.set('body', {
              position: 'static',
              overflowY: 'auto'
            });

            elSwiper.enable();
          }, 850);

          isNext = true;
        }, 700);
      }
    }, '-=0.3');

    tlNextchapter.to('#nextchapter, #content', {
      opacity: 0
    }, '+=0.5');
  }

  showmore() {
    this.DOM.showmorebtn.forEach(el => {
      el.addEventListener('click', function(e) {
        gsap.to(window, {
          duration: 0.5,
          scrollTo: '#content',
          ease: 'power4.out'
        });
      });
    });
  }

  onresize() {
    const elSwiper = this.swiper;
    const getNavitems = this.DOM.navitems;

    window.addEventListener('resize', () => {
      setTimeout(() => {
        const getIndex = elSwiper.realIndex;
        const getActive = getNavitems[getIndex];

        const getWidth = getActive.offsetWidth;
        const getLeft = getActive.offsetLeft;
        const getColor = getActive.dataset.color;

        gsap.to('.nav-pad', {
          width: getWidth,
          left: getLeft,
          background: getColor
        });
      }, 200);
    });
  }
}
