import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';

import Button from '@/Button.vue';

chai.use(sinonChai);

describe('Button', () => {
  it('存在.', () => {
    expect(Button).to.be.exist;
  });
  it('可以设置icon.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    });
    const useElement = wrapper.vm.$el.querySelector('use');
    expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings');
  });
  it('可以设置loading.', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
        loading: true,
      },
    });

    const useElements = wrapper.vm.$el.querySelectorAll('use');
    expect(useElements.length).to.equal(1);
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#i-loading');
  });
  it('icon 默认的 order 是 1', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(Button, {
      attachTo: div,
      propsData: {
        icon: 'settings',
      },
    });
    const icon = wrapper.vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.equal('1');
    wrapper.destroy();
  });
  it('设置 iconPosition 可以改变 order', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const wrapper = mount(Button, {
      attachTo: div,
      propsData: {
        icon: 'settings',
        iconPosition: 'right',
      },
    });

    const icon = wrapper.vm.$el.querySelector('svg');
    expect(getComputedStyle(icon).order).to.eq('2');
    wrapper.destroy();
  });
  it('点击 button 触发 click 事件', () => {
    const wrapper = mount(Button, {
      propsData: {
        icon: 'settings',
      },
    });

    const vm = wrapper.vm;
    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.been.called;
  });
});
