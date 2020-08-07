import Vue from 'vue';
import Button from './Button';
import Icon from './Icon';
import ButtonGroup from './ButtonGroup.vue';
import Input from './Input';
import Row from './Row';
import Col from './Col';

Vue.component('o-button', Button);
Vue.component('o-icon', Icon);
Vue.component('o-button-group', ButtonGroup);
Vue.component('o-input', Input);
Vue.component('o-row', Row);
Vue.component('o-col', Col);

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false,
    message: '',
  },
  created() {},
  methods: {
    handleClickBtn() {
      this.message += '1';
    },
  },
});
