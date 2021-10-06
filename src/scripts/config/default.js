import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Default() {
  gsap.config({
    nullTargetWarn: false
  });

  // Config GSAP
  gsap.defaults({
    ease: 'expo.out',
    duration: 1.4
  });

  ScrollTrigger.defaults({
    start: 'top bottom-=20%'
  });
}
