import Vue from 'vue';
import Toast from '../src/Toast';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

describe('Toast', () => {
  it('存在.', () => {
    expect(Toast).to.exist;
  });
  describe('props', () => {
    it('接收 autoClose ', (done) => {
      const div = document.createElement('div');
      document.body.appendChild(div);
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          autoClose: 1,
        },
      }).$mount(div);
      vm.$on('close', () => {
        expect(document.body.contains(vm.$el)).to.eq(false);
        done();
      });
    });
    it('接收 closeButton ', (done) => {
      const callback = sinon.fake();
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          closeButton: {
            text: '确认',
            callback,
          },
        },
      }).$mount();
      const closeBtn = vm.$el.querySelector('.close');
      // 使用 textContent 读取节点的文本及其后代
      expect(closeBtn.textContent.trim()).to.eq('确认');
      setTimeout(() => {
        closeBtn.click();
        expect(callback).to.have.been.called;
        done();
      }, 200);
    });
    it('接收 enableHtml ', () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          enableHtml: true,
        },
      });
      vm.$slots.default = ['<strong id="aaa">aaa</strong>'];
      vm.$mount();
      let tag = vm.$el.querySelector('#aaa');
      expect(tag).to.exist;
    });
    it('接收 position ', () => {
      const Constructor = Vue.extend(Toast);
      const vm = new Constructor({
        propsData: {
          position: 'middle',
        },
      }).$mount();
      expect(vm.$el.classList.contains('position-middle')).to.eq(true);
    });
  });
});
