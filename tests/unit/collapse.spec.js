import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

import Collapse from '@/Collapse';
import CollapseItem from '@/CollapseItem';

chai.use(sinonChai);

describe('Collapse', () => {
  it('存在.', () => {
    expect(Collapse).to.exist;
  });

  it('可以设置 selected 属性', (done) => {
    Vue.component('o-collapse-item', CollapseItem);
    const wrapper = mount(Collapse, {
      propsData: {
        selected: ['1', '2'],
      },
      slots: {
        default: `
          <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
          <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
          <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
        `,
      },
    });

    setTimeout(() => {
      expect(wrapper.vm.$el.querySelector('#c1')).to.be.exist;
      expect(wrapper.vm.$el.querySelector('#c2')).to.be.exist;
      expect(wrapper.vm.$el.querySelector('#c3')).to.not.be.exist;
      done();
    }, 1000);
  });

  it('可以设置 single 属性', (done) => {
    Vue.component('o-collapse-item', CollapseItem);
    const wrapper = mount(Collapse, {
      propsData: {
        selected: ['1'],
        single: true,
      },
      slots: {
        default: `
          <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
          <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
          <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
        `,
      },
    });

    setTimeout(() => {
      wrapper.find('.collapse-item[data-item="3"] > .title').trigger('click');

      setTimeout(() => {
        expect(wrapper.vm.$el.querySelector('#c1')).to.not.be.exist;
        expect(wrapper.vm.$el.querySelector('#c2')).to.not.be.exist;
        expect(wrapper.vm.$el.querySelector('#c3')).to.be.exist;
        done();
      }, 200);
    }, 200);
  });

  it('触发 update:selected 事件', async () => {
    Vue.component('o-collapse-item', CollapseItem);
    const callback = sinon.fake();
    const wrapper = mount(Collapse, {
      propsData: {
        selected: ['1'],
      },
      slots: {
        default: `
          <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
          <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
          <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
        `,
      },
      listeners: {
        'update:selected': callback,
      },
    });

    await wrapper
      .find('.collapse-item[data-item="3"] > .title')
      .trigger('click');
    expect(callback).to.have.been.calledWith(['1', '3']);
  });
});
