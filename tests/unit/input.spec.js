import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Input from '@/Input';

chai.use(sinonChai);

describe('Input', () => {
  it('存在.', () => {
    expect(Input).to.exist;
  });

  describe('props', () => {
    let wrapper;
    afterEach(function() {
      wrapper.destroy();
    });
    it('接收value', () => {
      wrapper = mount(Input, {
        propsData: {
          value: '1234',
        },
      });
      expect(wrapper.find('input').element.value).eq('1234');
    });
    it('接收disabled', () => {
      wrapper = mount(Input, {
        propsData: {
          disabled: true,
        },
      });
      expect(wrapper.find('input').element.disabled).eq(true);
    });
    it('接收readonly', () => {
      wrapper = mount(Input, {
        propsData: {
          readonly: true,
        },
      });

      expect(wrapper.find('input').element.readOnly).eq(true);
    });
    it('接收error', () => {
      const errMsg = '名字不符合规范';
      wrapper = mount(Input, {
        propsData: {
          error: errMsg,
        },
      });

      expect(wrapper.find('use').element.getAttribute('xlink:href')).eq(
        '#i-error'
      );
      // wrapper.find('.errorMessage').element.innerText 也可
      expect(wrapper.find('.errorMessage').text()).eq(errMsg);
    });
  });
  describe('events', () => {
    let wrapper;
    afterEach(function() {
      wrapper.destroy();
    });
    it('支持 change/focus/input/blur事件', () => {
      // change事件是需要 value 改变且失去焦点触发
      // input事件是 value 改变就触发
      // focus事件是获取焦点就触发
      // blur事件是失去焦点就触发
      ['change', 'focus', 'input', 'blur'].forEach((evName) => {
        const callback = sinon.fake();
        wrapper = mount(Input, {
          listeners: {
            [evName]: callback,
          },
        });
        // 触发事件
        const event = new Event(evName);
        Object.defineProperty(event, 'target', {
          value: { value: 'hi', enumerable: true },
        });
        const inputEle = wrapper.find('input').element;
        inputEle.dispatchEvent(event);
        expect(callback).to.have.been.calledWith(event.target.value);
      });
    });
  });
});
