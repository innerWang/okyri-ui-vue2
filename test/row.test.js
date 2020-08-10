import Vue from 'vue';
import Row from '../src/Row';
import Col from '../src/Col';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

describe('Row', () => {
  it('存在.', () => {
    expect(Row).to.be.ok;
  });
  describe('props', () => {
    let div, vm;
    beforeEach(function () {
      div = document.createElement('div');
      document.body.appendChild(div);
    });

    // 将 done 作为参数传递给 it 的回调函数，mocha 就会知道需要等待 done 被调用才会完成测试，常用于异步测试
    it('接收 gutter 属性.', (done) => {
      Vue.component('o-row', Row);
      Vue.component('o-col', Col);
      div.innerHTML = `
        <o-row gutter="20">
          <o-col span="12"></o-col>
          <o-col span="12"></o-col>
        </o-row>
      `;
      vm = new Vue({
        el: div,
      });
      setTimeout(() => {
        const row = vm.$el.querySelector('.row');
        expect(window.getComputedStyle(row).marginLeft).to.eq('-10px');
        expect(getComputedStyle(row).marginRight).to.eq('-10px');
        const cols = vm.$el.querySelectorAll('.col');
        expect(getComputedStyle(cols[0]).paddingRight).to.eq('10px');
        expect(getComputedStyle(cols[1]).paddingLeft).to.eq('10px');
        done();
        vm.$el.remove();
        vm.$destroy();
      });
    });
    it('接收 align 属性.', () => {
      const Constructor = Vue.extend(Row);
      vm = new Constructor({
        propsData: {
          align: 'right',
        },
      }).$mount(div);
      expect(window.getComputedStyle(vm.$el).justifyContent).to.eq('flex-end');
      // 将 div 从其挂载的树移除
      div.remove();
      vm.$destroy();
    });
  });
});
