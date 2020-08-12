import Vue from 'vue';
import Button from './Button';
import Icon from './Icon';
import ButtonGroup from './ButtonGroup.vue';
import Input from './Input';
import Row from './Row';
import Col from './Col';
import Layout from './Layout';
import Header from './Header';
import Footer from './Footer';
import Sider from './Sider';
import Content from './Content';

Vue.component('o-button', Button);
Vue.component('o-icon', Icon);
Vue.component('o-button-group', ButtonGroup);
Vue.component('o-input', Input);
Vue.component('o-row', Row);
Vue.component('o-col', Col);
Vue.component('o-layout', Layout);
Vue.component('o-header', Header);
Vue.component('o-footer', Footer);
Vue.component('o-content', Content);
Vue.component('o-sider', Sider);

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
