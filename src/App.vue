<template>
  <div id="app">
    <transition @appear="enter" @enter="enter" @before-leave="beforeLeave" @leave="leave" :css="false" appear>
      <router-view />
    </transition>
  </div>
</template>

<script>
import gsap from 'gsap';
export default {
  data() {
    return {
      transition: 'initial',
    };
  },
  mounted() {
    if (this.$route.path != '/') {
      this.$router.push('/');
    }
    document.querySelector('body').classList.add('shopping-cart');
    // to avoid twenty twenty css overrides
    const prod = document.querySelector('.entry-content');
    if (prod) {
      prod.classList.remove('entry-content');
    }
  },
  methods: {
    enter(el, done) {
      const tl = gsap.timeline();
      if (this.transition === 'left') {
        const h3 = gsap.utils.toArray('h3');
        const div = gsap.utils.toArray('.description > div');
        gsap.set('.left', { autoAlpha: 0 });
        gsap.set('.left > a img', { autoAlpha: 0 });
        gsap.set('.left .number', { autoAlpha: 0, y: -20 });
        gsap.set('.left-inner img', { autoAlpha: 0 });
        gsap.set('.left-inner .design > span', { xPercent: -100 });
        gsap.set('.left-inner .design > div span', { y: -50 });
        gsap.set('h1', { autoAlpha: 0 });
        gsap.set('h4', { autoAlpha: 0 });
        gsap.set('p', { autoAlpha: 0 });
        gsap.set('.remove-button', { autoAlpha: 0 });
        gsap.set(h3, { autoAlpha: 0 });
        gsap.set(div, { autoAlpha: 0 });
        tl.delay(1);
        tl.to('.left', { autoAlpha: 1, duration: 0.3 }, 0.2);
        tl.to('.left > a img', { autoAlpha: 1, duration: 0.5 }, 0.2);
        tl.to('.left .number', { autoAlpha: 0.1, y: 0, duration: 0.5 }, 0.5);
        tl.to('.left-inner img', { autoAlpha: 1, duration: 0.5 }, 0.8);
        tl.to('.left-inner .design > span', { xPercent: 0, duration: 0.6 }, 1.5);
        tl.staggerTo('.left-inner .design > div span', 0.5, { y: 0 }, 0.15, 1.7);
        tl.to('h1', { autoAlpha: 1, duration: 0.3 }, 1.7);
        tl.to('h4', { autoAlpha: 1, duration: 0.3 }, 1.8);
        tl.to('p', { autoAlpha: 1, duration: 0.3 }, 1.9);
        tl.to(h3, { autoAlpha: 1, duration: 0.3 }, 2);
        tl.to(div, { autoAlpha: 1, duration: 0.3 }, 2.1);
        tl.to('.remove-button', { autoAlpha: 1, duration: 0.3 }, 2.3);
        tl.add(() => {
          done();
        });
      } else {
        const products = gsap.utils.toArray('.product-item');
        const cardTypes = gsap.utils.toArray('.card-select .choice');
        gsap.set(el, { autoAlpha: 0 });
        gsap.set('.card-list', { autoAlpha: 0, y: -20 });
        gsap.set(cardTypes, { autoAlpha: 0, y: -20 });
        gsap.set('.card-form__inner', { autoAlpha: 0, y: -20 });
        gsap.set(products, { autoAlpha: 0 });
        gsap.set('.total', { autoAlpha: 0 });
        tl.to(el, { duration: 0.3, autoAlpha: 1 }, 0.5);
        tl.staggerFromTo(products, 0.7, { y: 50 }, { y: 0 }, 0.15, 1);
        tl.staggerTo(products, 0.3, { autoAlpha: 1 }, 0.15, 1);
        tl.to('.total', { duration: 0.3, autoAlpha: 1 }, 1);
        tl.to('.card-list', { duration: 0.3, autoAlpha: 1, y: 0 }, 1.3);
        tl.staggerTo(cardTypes, 0.2, { autoAlpha: 1, y: 0, ease: 'linear' }, 0.1, 1.15);
        tl.to('.card-form__inner', { duration: 0.3, autoAlpha: 1, y: 0 }, 1.6);
        tl.add(() => {
          done();
        });
      }
    },
    beforeLeave(el) {
      if (this.transition === 'left') {
        gsap.to(el, { duration: 0.5, autoAlpha: 0 });
      } else {
        gsap.to(el, { duration: 0.5, autoAlpha: 0 });
      }
    },
    leave(el, done) {
      gsap.to(el, { duration: 0.5, autoAlpha: 0, onComplete: done });
    },
  },
  watch: {
    $route(to) {
      if (to.path === '/details') {
        this.transition = 'left';
      } else {
        this.transition = 'right';
      }
    },
  },
};
</script>
<style lang="scss">
* {
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
}
body {
  border: 0;
  background-color: $pink !important;
  margin: 0;
  padding: 0;
  button {
    appearance: none;
    border: 0;
    background-color: transparent;
    cursor: pointer;
  }
}
#app {
  @include font-bold;
  @include fs-text;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $blue;
  min-height: 100vh;
  a {
    color: $blue;
    text-decoration: none;
  }
}
// hide wordpress stuff
body.shopping-cart {
  .footer-nav-widgets-wrapper.header-footer-group,
  #site-footer,
  header.entry-header,
  #site-header,
  .header-toggles {
    display: none !important;
  }
  .post-inner {
    padding-top: 0;
  }
  #app {
    max-width: none;
    width: auto;
  }
  // .entry-content {
  //   @include font-bold;
  //   @include fs-text;
  //   h1,
  //   h2,
  //   h3,
  //   h4,
  //   h5,
  //   h6,
  //   p {
  //     margin: unset;
  //   }
  //   button:hover {
  //     text-decoration: none;
  //   }
  // }
}
</style>
