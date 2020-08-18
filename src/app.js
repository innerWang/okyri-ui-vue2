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
import Tabs from './Tabs';
import TabsBody from './TabsBody';
import TabsHead from './TabsHead';
import TabsItem from './TabsItem';
import TabsPane from './TabsPane';
import Popover from './Popover';

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
Vue.component('o-tabs', Tabs);
Vue.component('o-tabs-head', TabsHead);
Vue.component('o-tabs-body', TabsBody);
Vue.component('o-tabs-item', TabsItem);
Vue.component('o-tabs-pane', TabsPane);
Vue.component('o-popover', Popover);

new Vue({
  el: '#app',
  data: {
    selectedTab: 'rank',
  },
  created() {},
  methods: {
    handleClickBtn1() {
      this.showMessage('top');
    },
    handleClickBtn2() {
      this.showMessage('bottom');
    },
    handleClickBtn3() {
      this.showMessage('middle');
    },
    showMessage(position) {
      this.$toast('<strong>toast message</strong>', {
        // 若只设置prop 是对象的部分属性，并不会和默认的属性取值去合并
        closeButton: {
          text: 'OK',
          callback: () => {
            console.log(' 调用回调 ');
          },
        },
        enableHtml: true,
        position: position,
      });
    },
  },
});
