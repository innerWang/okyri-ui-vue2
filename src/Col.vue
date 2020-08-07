<template>
  <div
    class="col"
    :class="[span && `col-${span}`, offset && `offset-${offset}`]"
    :style="{
      paddingLeft: gutter / 2 + 'px',
      paddingRight: gutter / 2 + 'px',
    }"
  >
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
  data: function () {
    return {
      gutter: 0,
    };
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
