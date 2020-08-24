<template>
  <div class="col" :class="colClasses" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = (value) => {
  let keys = Object.keys(value);
  let valid = true;
  keys.forEach((key) => {
    if (['span', 'offset'].indexOf(key) === -1) {
      valid = false;
    }
  });
  return valid;
};
export default {
  name: 'OkyriCol',
  props: {
    // span 为跨度
    span: { type: [Number, String] },
    // offset 为左侧偏移
    offset: { type: [Number, String] },
    ipad: { type: Object, validator },
    narrowPc: { type: Object, validator },
    pc: { type: Object, validator },
    widePc: { type: Object, validator },
  },
  // data 里的值只会在 created 之后去读一次，后续更改需要 set 触发渲染更新
  data: function() {
    return {
      gutter: 0,
    };
  },
  methods: {
    calcReactiveClass(reactiveType, infix) {
      if (!reactiveType) {
        return [];
      }
      let array = [];
      if (reactiveType.span) {
        array.push(`col-${infix}-${reactiveType.span}`);
      }
      if (reactiveType.offset) {
        array.push(`offset-${infix}-${reactiveType.offset}`);
      }
      return array;
    },
  },
  computed: {
    colClasses() {
      let { span, offset, ipad, narrowPc, pc, widePc } = this;
      return [
        span && `col-${span}`,
        offset && `offset-${offset}`,
        ...this.calcReactiveClass(ipad, 'ipad'),
        ...this.calcReactiveClass(narrowPc, 'narrow-pc'),
        ...this.calcReactiveClass(pc, 'pc'),
        ...this.calcReactiveClass(widePc, 'wide-pc'),
      ];
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
// 默认是 phone，没写对应响应式样式时则向下兼容
.col {
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

  @media (min-width: 577px) and (max-width: 768px) {
    $class-prefix: col-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 769px) and (max-width: 992px) {
    $class-prefix: col-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 993px) and (max-width: 1200px) {
    $class-prefix: col-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }

  @media (min-width: 1201px) {
    $class-prefix: col-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }

    $class-prefix: offset-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
</style>
