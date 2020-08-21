import Vue from 'vue';
import Collapse from '../src/Collapse';
import CollapseItem from '../src/CollapseItem';

Vue.config.productionTip = false;
Vue.config.devtools = false;

const expect = chai.expect;

describe('Collapse', () => {
  it('存在.', () => {
    expect(Collapse).to.exist;
  });

  it('可以设置 selected 属性', (done) => {
    Vue.component('o-collapse', Collapse);
    Vue.component('o-collapse-item', CollapseItem);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-collapse :selected="xxx">
        <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
        <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
        <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
      </o-collapse>
    `;
    const divVM = new Vue({
      el: div,
      data: {
        xxx: ['1', '2'],
      },
    });

    setTimeout(() => {
      expect(divVM.$el.querySelector('#c1')).to.be.exist;
      expect(divVM.$el.querySelector('#c2')).to.be.exist;
      expect(divVM.$el.querySelector('#c3')).to.not.be.exist;
      done();
    }, 1000);
  });

  it('可以设置 single 属性', (done) => {
    Vue.component('o-collapse', Collapse);
    Vue.component('o-collapse-item', CollapseItem);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-collapse :selected="xxx" single>
        <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
        <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
        <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
      </o-collapse>
    `;

    const divVM = new Vue({
      el: div,
      data: {
        xxx: ['1'],
      },
    });

    setTimeout(() => {
      divVM.$el.querySelector('.collapse-item[data-item="3"] > .title').click();

      setTimeout(() => {
        expect(divVM.$el.querySelector('#c1')).to.not.be.exist;
        expect(divVM.$el.querySelector('#c2')).to.not.be.exist;
        expect(divVM.$el.querySelector('#c3')).to.be.exist;
        done();
      }, 200);
    }, 200);
  });

  it('触发 update:selected 事件', (done) => {
    Vue.component('o-collapse', Collapse);
    Vue.component('o-collapse-item', CollapseItem);
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
      <o-collapse :selected="xxx" @update:selected="onSelect">
        <o-collapse-item title="标题1" name="1"><span id="c1">内容1</span></o-collapse-item>
        <o-collapse-item title="标题2" name="2"><span id="c2">内容2</span></o-collapse-item>
        <o-collapse-item title="标题3" name="3"><span id="c3">内容3</span></o-collapse-item>
      </o-collapse>
    `;
    const callback = sinon.fake();
    const divVM = new Vue({
      el: div,
      data: {
        xxx: ['1'],
      },
      methods: {
        onSelect: callback,
      },
    });
    setTimeout(() => {
      divVM.$el.querySelector('.collapse-item[data-item="3"] > .title').click();

      setTimeout(() => {
        expect(callback).to.have.been.called;
        done();
      }, 200);
    }, 200);
  });
});
