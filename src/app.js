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
import Toast from './Toast.vue';
import plugin from './plugin';

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
Vue.component('o-toast', Toast);
Vue.use(plugin);

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
      this.showMessage();
    },
    showMessage() {
      this.$toast('<strong>toash message</strong>', {
        // 若只设置部分属性，并不会和默认的属性去合并
        closeButton: {
          text: 'OK',
          callback: () => {
            console.log('用户说 OK');
          },
        },
        autoClose: false,
        enableHtml: true,
        position: 'middle',
      });
    },
  },
});
