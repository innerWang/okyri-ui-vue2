import Vue from 'vue';
import Button from './Button';
import Icon from './Icon';
import ButtonGroup from './ButtonGroup.vue';

Vue.component('o-button', Button);
Vue.component('o-icon', Icon);
Vue.component('o-button-group', ButtonGroup);

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: true,
    loading3: false,
  },
});

import chai from 'chai';
const { expect } = chai;
{
  // Vue.extend 会使用基础 Vue 构造器 ，创建一个子类，其参数是包含组件选项的对象
  const ButtonConstructor = Vue.extend(Button);
  // 创建一个实例并挂载，返回的仍是实例本身，创建实例时若没有传递 $el 选项，则没有关联的DOM元素，此时可以用 $mount 手动挂载
  // 挂载时若没有传递 elOrSelector，模板会被渲染为文档之外的元素，此时就需要使用原生API 将其插回文档。
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'set',
    },
  }).$mount();
  const useEle = vm.$el.querySelector('use');
  const href = useEle.getAttribute('xlink:href');
  expect(href).to.eq('#i-set');
  // node.remove() 是将 node 从所在的树移除
  vm.$el.remove();
  // 完全销毁一个实例，清理它与其它实例的连接，解绑它的全部指令及事件监听器
  // 【 注意单词别写错了！是 destroy 不是 destory ! 】
  vm.$destroy();
}
{
  const ButtonConstructor = Vue.extend(Button);
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'set',
      loading: true,
    },
  }).$mount();
  const useEle = vm.$el.querySelector('use');
  const href = useEle.getAttribute('xlink:href');
  expect(href).to.eq('#i-loading');
  vm.$el.remove();
  vm.$destroy();
}
{
  const div = document.createElement('div');
  document.body.appendChild(div);
  const ButtonConstructor = Vue.extend(Button);
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'set',
    },
  }).$mount(div); // 此时需要渲染到文档内部，否则无法计算样式，此时会替换创建的 div
  const svg = vm.$el.querySelector('svg');
  const { order } = window.getComputedStyle(svg);
  expect(order).to.eq('1');
  vm.$el.remove();
  vm.$destroy();
}
{
  const div = document.createElement('div');
  document.body.appendChild(div);
  const ButtonConstructor = Vue.extend(Button);
  const vm = new ButtonConstructor({
    propsData: {
      icon: 'set',
      iconPosition: 'right',
    },
  }).$mount(div);
  const svg = vm.$el.querySelector('svg');
  const { order } = window.getComputedStyle(svg);
  expect(order).to.eq('2');
  vm.$el.remove();
  vm.$destroy();
}
