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
    const Constructor = Vue.extend(Input);
    let vm;
    afterEach(function () {
      // runs after each test in this block
      vm.$destroy();
    });
    it('接收value', () => {
      vm = new Constructor({
        propsData: {
          value: '1234',
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.value).eq('1234');
    });
    it('接收disabled', () => {
      vm = new Constructor({
        propsData: {
          disabled: true,
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.disabled).eq(true);
    });
    it('接收readonly', () => {
      vm = new Constructor({
        propsData: {
          readonly: true,
        },
      }).$mount();
      const inputEle = vm.$el.querySelector('input');
      expect(inputEle.readOnly).eq(true);
    });
    it('接收error', () => {
      const errMsg = '名字不符合规范';
      vm = new Constructor({
        propsData: {
          error: errMsg,
        },
      }).$mount();
      const useEle = vm.$el.querySelector('use');
      expect(useEle.getAttribute('xlink:href')).eq('#i-error');
      const msg = vm.$el.querySelector('.errorMessage');
      expect(msg.innerText).eq(errMsg);
    });
  });
  describe('events', () => {
    const Constructor = Vue.extend(Input);
    let vm;
    afterEach(function () {
      vm.$destroy();
    });
    it('支持 change/focus/input/blur事件', () => {
      // change事件是需要 value 改变且失去焦点触发
      // input事件是 value 改变就触发
      // focus事件是获取焦点就触发
      // blur事件是失去焦点就触发
      ['change', 'focus', 'input', 'blur'].forEach((evName) => {
        vm = new Constructor({}).$mount();
        const callback = sinon.fake();
        vm.$on(evName, callback);
        // 触发事件
        const event = new Event(evName);
        Object.defineProperty(event, 'target', {
          value: { value: 'hi', enumerable: true },
        });
        let inputEle = vm.$el.querySelector('input');
        inputEle.dispatchEvent(event);
        expect(callback).to.have.been.calledWith(event.target.value);
      });
    });
  });
});
