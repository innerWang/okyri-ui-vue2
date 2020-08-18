import Vue from 'vue';
import Tabs from '../src/Tabs';
import TabsBody from '../src/TabsBody';
import TabsHead from '../src/TabsHead';
import TabsItem from '../src/TabsItem';
import TabsPane from '../src/TabsPane';
Vue.component('o-tabs', Tabs);
Vue.component('o-tabs-head', TabsHead);
Vue.component('o-tabs-body', TabsBody);
Vue.component('o-tabs-item', TabsItem);
Vue.component('o-tabs-pane', TabsPane);

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

describe('Tabs', () => {
  it('存在.', () => {
    expect(Tabs).to.exist;
  });

  it('接收 selected 属性', (done) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-tabs selected="tab2">
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
      </o-tabs>
    `;
    const vm = new Vue({
      el: div,
    });
    vm.$nextTick(() => {
      let d = vm.$el.querySelector('.tabs-item[data-name="tab2"]');
      expect(d.classList.contains('active')).to.be.true;
      done();
    });
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
    const Constructor = Vue.extend(TabsItem);
    const vm = new Constructor({
      propsData: {
        name: 'tab1',
      },
    }).$mount();
    expect(vm.$el.getAttribute('data-name')).to.eq('tab1');
  });
  it('接受 disabled 属性。', () => {
    const Constructor = Vue.extend(TabsItem);
    const vm = new Constructor({
      propsData: {
        disabled: true,
        name: 'tab1',
      },
    }).$mount();
    expect(vm.$el.classList.contains('disabled')).to.be.true;
    const callback = sinon.fake();
    vm.$on('click', callback);
    vm.$el.click();
    expect(callback).to.have.not.been.called;
  });
});

describe('TabsPane', () => {
  it('存在。', () => {
    expect(TabsPane).to.be.exist;
  });
});
