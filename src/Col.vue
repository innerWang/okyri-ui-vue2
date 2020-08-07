<template>
  <div class="col" :class="colClasses" :style="colStyle">
    <slot></slot>
    <div style="border: 1px solid green; height: 50px;"></div>
  </div>
</template>

<script>
export default {
  name: 'OkyriCol',
  props: {
    // span 为跨度
    span: {
      type: [Number, String],
    },
    // offset 为左侧偏移
    offset: {
      type: [Number, String],
    },
  },
  // data 里的值只会在 created 之后去读一次，后续更改需要 set 触发渲染更新
  data: function () {
    return {
      gutter: 0,
    };
  },
  computed: {
    colClasses() {
      let { span, offset } = this;
      return [span && `col-${span}`, offset && `offset-${offset}`];
    },
    colStyle() {
      return {
        paddingLeft: this.gutter / 2 + 'px',
        paddingRight: this.gutter / 2 + 'px',
      };
    },
  },
};
</script>

<style lang="scss" scoped>
$col-height: 100px;
.col {
  height: $col-height;
  width: 50%;

  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }

  $class-prefix: offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
}
</style>
