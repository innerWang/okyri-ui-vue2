import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import Toast from '@/Toast';
import { mount } from '@vue/test-utils';
//import Vue from 'vue';

chai.use(sinonChai);

describe('Toast', () => {
  it('存在.', () => {
    expect(Toast).to.exist;
  });
  describe('props', () => {
    it('接收 autoClose ', async () => {
      const div = document.createElement('div');
      document.body.appendChild(div);

      const wrapper = mount(Toast, {
        attachTo: div,
        propsData: {
          autoClose: 1,
        },
      });

      await new Promise((resolve) => setTimeout(resolve, 1500));
      expect(document.body.contains(wrapper.element)).to.eq(false);
    });
    it('接收 closeButton ', async () => {
      const callback = sinon.fake();
      const wrapper = mount(Toast, {
        propsData: {
          closeButton: {
            text: '确认',
            callback,
          },
        },
      });
      const btn = wrapper.find('.close');
      expect(btn.text().trim()).to.eq('确认');
      await btn.trigger('click');
      expect(callback).to.have.been.called;
    });
    it('接收 enableHtml ', () => {
      // const Constructor = Vue.extend(Toast);
      // const vm = new Constructor({
      //   propsData: {
      //     enableHtml: true,
      //   },
      // });
      // vm.$slots.default = ['<strong id="aaa">aaa</strong>'];
      // vm.$mount();
      // let tag = vm.$el.querySelector('#aaa');
      // expect(tag).to.exist;
      const wrapper = mount(Toast, {
        slots: {
          default: '<strong id="aaa">aaa</strong>',
        },
      });
      wrapper.setProps({ enableHtml: true }); // 这里要是和 slots 在mount 时同时设置就会报错，此处才单独设置
      expect(wrapper.find('#aaa')).to.exist;
    });
    it('接收 position ', () => {
      const wrapper = mount(Toast, {
        propsData: {
          position: 'middle',
        },
      });
      expect(wrapper.classes()).to.include('position-middle');
    });
  });
});
