<template>
  <div class="tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue';
export default {
  name: 'OkyriTabs',
  props: {
    selected: {
      type: String,
      required: true,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (val) => {
        return ['horizontal', 'vertical'].indexOf(val) !== -1;
      },
    },
  },
  data: function () {
    return {
      // 使用 data 进行数据中转，保证当前组件也可以访问 eventBus
      eventBus: new Vue(),
    };
  },
  // 使用 provide 进行依赖注入
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  mounted() {
    // $children 只能获取到子组件
    if (this.$children.length === 0) {
      console &&
        console.warn &&
        console.warn(
          'tabs 的子组件应该是 tabs-head 和 tabs-body，但你没写子组件'
        );
    }
    for (let child of this.$children) {
      if (
        ['OkyriTabsHead', 'OkyriTabsBody'].indexOf(child.$options.name) === -1
      ) {
        throw new Error('tabs 的子组件只能是 tabs-head 和 tabs-body');
      }
    }
    this.$children.forEach((vm) => {
      if (vm.$options.name === 'OkyriTabsHead') {
        vm.$children.forEach((childVm) => {
          if (
            childVm.$options.name === 'OkyriTabsItem' &&
            childVm.name === this.selected
          ) {
            this.eventBus.$emit('update:selected', this.selected, childVm);
          }
        });
      }
    });
  },
};
</script>

<style lang="scss" scoped></style>
