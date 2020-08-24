import { expect } from 'chai';
import Popover from '@/Popover';
import { mount } from '@vue/test-utils';

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).to.exist;
  });

  it('可以设置 position', async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: `<button>点我</button>`,
        content: `<div>弹出内容</div>`,
      },
      propsData: {
        position: 'bottom',
      },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('.content-wrapper').classes()).to.include(
      'position-bottom'
    );
  });
  //若测试用例有问题，可以使用 xit 跳过测试环节
  it('可以设置 trigger', async () => {
    const wrapper = mount(Popover, {
      slots: {
        default: `<button>点我</button>`,
        content: `<div>弹出内容</div>`,
      },
      propsData: {
        position: 'bottom',
        trigger: 'hover',
      },
    });
    expect(wrapper.find('.content-wrapper').element).to.not.exist;
    await wrapper.find('.popover').trigger('mouseenter');
    expect(wrapper.find('.content-wrapper').element).to.exist;
  });
});
