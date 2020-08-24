import { expect } from 'chai';
import Row from '@/Row';
import Col from '@/Col';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

describe('Row', () => {
  it('存在.', () => {
    expect(Row).to.be.ok;
  });
  describe('props', () => {
    let div, wrapper;
    beforeEach(function() {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    afterEach(function() {
      wrapper.destroy();
    });

    // 将 done 作为参数传递给 it 的回调函数，mocha 就会知道需要等待 done 被调用才会完成测试，常用于异步测试
    it('接收 gutter 属性.', async () => {
      Vue.component('o-col', Col);
      wrapper = mount(Row, {
        attachTo: div, // 要计算样式，需要挂载到文档中
        slots: {
          default: ['<o-col span="12"></o-col>', '<o-col span="12"></o-col>'],
        },
        propsData: {
          gutter: 20,
        },
      });

      await Vue.nextTick();
      expect(getComputedStyle(wrapper.element).marginLeft).to.eq('-10px');
      expect(getComputedStyle(wrapper.element).marginRight).to.eq('-10px');
      const col1 = wrapper.find('.col').element;
      expect(getComputedStyle(col1).paddingLeft).to.eq('10px');
      expect(getComputedStyle(col1).paddingRight).to.eq('10px');
    });
    it('接收 align 属性.', () => {
      wrapper = mount(Row, {
        attachTo: div,
        propsData: {
          align: 'right',
        },
      });

      expect(window.getComputedStyle(wrapper.element).justifyContent).to.eq(
        'flex-end'
      );
    });
  });
});
