<template>
  <div class="row" :style="rowStyle" :class="rowClasses">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriRow',
  props: {
    // 单位是像素
    gutter: {
      type: [Number, String],
    },
    align: {
      type: String,
      validator: (val) => {
        return ['left', 'right', 'center'].indexOf(val) !== -1;
      },
    },
  },
  computed: {
    rowStyle() {
      return {
        marginLeft: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px',
      };
    },
    rowClasses() {
      let { align } = this;
      return [align && `align-${align}`];
    },
  },
  mounted() {
    // 需要注意，此处需要使用箭头函数，否则需要 bind this
    this.$children.forEach((vm) => {
      vm.gutter = this.gutter;
    });
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: flex;
  flex-wrap: wrap;

  &.align- {
    &left {
      justify-content: flex-start;
    }
    &center {
      justify-content: center;
    }
    &right {
      justify-content: flex-end;
    }
  }
}
</style>
