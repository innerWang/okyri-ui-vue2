import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { mount } from '@vue/test-utils';
import Vue from 'vue';
import Tabs from '@/Tabs';
import TabsBody from '@/TabsBody';
import TabsHead from '@/TabsHead';
import TabsItem from '@/TabsItem';
import TabsPane from '@/TabsPane';

Vue.component('o-tabs-head', TabsHead);
Vue.component('o-tabs-body', TabsBody);
Vue.component('o-tabs-item', TabsItem);
Vue.component('o-tabs-pane', TabsPane);

chai.use(sinonChai);

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist;
  });

  it('接收 selected 属性', async () => {
    // const div = document.createElement('div');
    // document.body.appendChild(div);
    const wrapper = mount(Tabs, {
      slots: {
        default: `
          <o-tabs-head>
            <o-tabs-item name="tab1">tab1</o-tabs-item>
            <o-tabs-item name="tab2">tab2</o-tabs-item>
            <o-tabs-item name="tab3">tab3</o-tabs-item>
          </o-tabs-head>
          <o-tabs-body>
            <o-tabs-pane name="tab1">content1</o-tabs-pane>
            <o-tabs-pane name="tab2">content2</o-tabs-pane>
            <o-tabs-pane name="tab3">content3</o-tabs-pane>
          </o-tabs-body>
        `,
      },
      propsData: {
        selected: 'tab2',
      },
    });

    await Vue.nextTick();
    expect(wrapper.find('.tabs-item[data-name="tab2"]').classes()).to.include(
      'active'
    );
  });
});

describe('TabsHead', () => {
  it('存在。', () => {
    expect(TabsHead).to.be.exist;
  });
});

describe('TabsBody', () => {
  it('存在。', () => {
    expect(TabsBody).to.be.exist;
  });
});

describe('TabsItem', () => {
  it('存在。', () => {
    expect(TabsItem).to.be.exist;
  });

  it('接受 name 属性。', () => {
    const wrapper = mount(TabsItem, {
      propsData: {
        name: 'tab1',
      },
    });

    expect(wrapper.element.getAttribute('data-name')).to.eq('tab1');
  });
  it('接受 disabled 属性。', () => {
    const callback = sinon.fake();
    const wrapper = mount(TabsItem, {
      propsData: {
        disabled: true,
        name: 'tab1',
      },
      listeners: {
        click: callback,
      },
    });

    expect(wrapper.classes()).to.include('disabled');
    wrapper.trigger('click');
    expect(callback).to.have.not.been.called;
  });
});

describe('TabsPane', () => {
  it('存在。', () => {
    expect(TabsPane).to.be.exist;
  });
});
