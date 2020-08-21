import Vue from 'vue';
import Popover from '../src/Popover';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

describe('Popover', () => {
  it('存在.', () => {
    expect(Popover).to.exist;
  });

  it('可以设置 position', (done) => {
    Vue.component('o-popover', Popover);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-popover ref="a" position="bottom">
        <template #content="{close}">
          弹出内容
          <button @click="close">关闭</button>
        </template>
        <button>点我</button>
      </o-popover>
    `;
    const divVM = new Vue({
      el: div,
    });
    divVM.$el.querySelector('button').click();
    divVM.$nextTick(() => {
      divVM.$nextTick(() => {
        const cont = divVM.$refs.a.$refs.contentWrapper;
        expect(cont.classList.contains('position-bottom')).to.be.true;
        done();
      });
    });
  });
  //若测试用例有问题，可以使用 xit 跳过测试环节
  it('可以设置 trigger', () => {
    Vue.component('o-popover', Popover);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-popover ref="a" trigger="hover">
        <template #content="{close}">
          弹出内容
          <button @click="close">关闭</button>
        </template>
        <button>点我</button>
      </o-popover>
    `;
    const divVM = new Vue({
      el: div,
    });
    // 触发自定义事件
    const event = new Event('mouseenter');
    divVM.$el.dispatchEvent(event);
    setTimeout(() => {
      expect(divVM.$refs.a.$refs.contentWrapper).to.be.exist;
      done();
    }, 1500);
  });
});
