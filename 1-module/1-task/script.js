import Vue from '/vendor/vue.esm.browser.js';
const app = new Vue({
  el: '#app',
  data: {
    buttonValue: 0,
  },
  methods: {
    incrementButtonValue() {
      this.buttonValue++;
    },
  },
});

window.app = app;
