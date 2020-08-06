import Vue from 'vue';
import Button from '../src/Button';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

// describe 和 it 是属于 mocha 库的，每一个 it 是一个新的测试用例
// expect 断言由 chai 提供
describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.be.ok; // 不是一个 falsy 的值
  });
  it('可以设置icon.', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
      },
    }).$mount();
    const useElement = vm.$el.querySelector('use');
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings');
    vm.$destroy();
  });
  it('可以设置loading.', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
        loading: true,
      },
    }).$mount();
    const useElements = vm.$el.querySelectorAll('use');
    expect(useElements.length).to.equal(1);
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading');
    vm.$destroy();
  });
  it('icon 默认的 order 是 1', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
      },
    }).$mount(div);
    const icon = vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.equal('1');
    vm.$el.remove();
    vm.$destroy();
  });
  it('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
        iconPosition: 'right',
      },
    }).$mount(div);
    const icon = vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.eq('2');
    vm.$el.remove();
    vm.$destroy();
  });
  it('点击 button 触发 click 事件', () => {
    const Constructor = Vue.extend(Button);
    const vm = new Constructor({
      propsData: {
        icon: 'settings',
      },
    }).$mount();

    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
    vm.$destroy();
  });
});
