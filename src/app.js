import Vue from 'vue';
import Button from './Button';
import Icon from './Icon';
import ButtonGroup from './ButtonGroup.vue';
import Input from './Input';

Vue.component('o-button', Button);
Vue.component('o-icon', Icon);
Vue.component('o-button-group', ButtonGroup);
Vue.component('o-input', Input);

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false,
  },
});
