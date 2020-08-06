import Vue from 'vue';
import Input from '../src/Input';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

// describe 和 it 是属于 mocha 库的，每一个 it 是一个新的测试用例
// expect 断言由 chai 提供
describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist;
  });
  describe('props', () => {
    it('接收value', () => {
      const Constructor = Vue.extend(Input);
      const vm = new Constructor({
        propsData: {
          value: '1234',
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.value).eq('1234');
      vm.$destroy();
    });
    it('接收disabled', () => {
      const Constructor = Vue.extend(Input);
      const vm = new Constructor({
        propsData: {
          disabled: true,
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.disabled).eq(true);
      vm.$destroy();
    });
    it('接收readonly', () => {
      const Constructor = Vue.extend(Input);
      const vm = new Constructor({
        propsData: {
          readonly: true,
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.readOnly).eq(true);
      vm.$destroy();
    });
    it('接收error', () => {
      const Constructor = Vue.extend(Input);
      const errMsg = '名字不符合规范';
      const vm = new Constructor({
        propsData: {
          error: errMsg,
        },
      }).$mount();
      const useEle = vm.$el.querySelector('use');
      expect(useEle.getAttribute('xlink:href')).eq('#i-error');
      const msg = vm.$el.querySelector('.errorMessage');
      expect(msg.innerText).eq(errMsg);
      vm.$destroy();
    });
  });
});
