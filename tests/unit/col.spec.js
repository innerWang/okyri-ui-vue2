import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import Col from '@/Col';

describe('Col', () => {
  it('存在.', () => {
    expect(Col).to.be.ok;
  });
  describe('props', () => {
    it('接收 span 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          span: 1,
        },
      });
      expect(wrapper.classes()).to.include('col-1');
    });
    it('接收 offset 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          offset: 1,
        },
      });
      expect(wrapper.vm.$el.classList.contains('offset-1')).to.eq(true);
    });
    it('接收 ipad 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          ipad: {
            span: 1,
            offset: 2,
          },
        },
      });

      expect(wrapper.vm.$el.classList.contains('col-ipad-1')).to.eq(true);
      expect(wrapper.vm.$el.classList.contains('offset-ipad-2')).to.eq(true);
    });
    it('接收 narrow-pc 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          narrowPc: {
            span: 1,
            offset: 2,
          },
        },
      });
      const { vm } = wrapper;
      expect(vm.$el.classList.contains('col-narrow-pc-1')).to.eq(true);
      expect(vm.$el.classList.contains('offset-narrow-pc-2')).to.eq(true);
    });
    it('接收 pc 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          pc: {
            span: 1,
            offset: 2,
          },
        },
      });
      const { vm } = wrapper;
      expect(vm.$el.classList.contains('col-pc-1')).to.eq(true);
      expect(vm.$el.classList.contains('offset-pc-2')).to.eq(true);
    });
    it('接收 widePc 属性.', () => {
      const wrapper = mount(Col, {
        propsData: {
          widePc: {
            span: 1,
            offset: 2,
          },
        },
      });
      const { vm } = wrapper;
      expect(vm.$el.classList.contains('col-wide-pc-1')).to.eq(true);
      expect(vm.$el.classList.contains('offset-wide-pc-2')).to.eq(true);
    });
  });
});
