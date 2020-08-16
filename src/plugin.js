/**
 *  使用 plugin 来注入方法
 *  1. 可以确保 Vue 构造器的正确引用
 *  2. 用户需要手动使用 Vue.use(plugin) 来调用 plugin 的 install 方法进行注入，
 *     这样用户就确保不去覆盖已有的实例方法。
 */
import Toast from './Toast.vue';
export default {
  install(Vue, options) {
    Vue.prototype.$toast = function (message) {
      const ToastConstructor = Vue.extend(Toast);
      const vm = new ToastConstructor();
      // slot 要在 mount 之前才会生效，default 属性即为默认插槽对应的节点
      vm.$slots.default = [message];
      // 在文档之外渲染，然后手动挂载到指定位置，若是直接给 $mount 传参指定挂载的元素，会替换这个元素
      vm.$mount(); // mount 才会渲染，才会执行所有的生命周期钩子
      document.body.appendChild(vm.$el);
    };
  },
};
