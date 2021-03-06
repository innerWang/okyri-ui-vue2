<template>
  <button
    class="o-button"
    :class="{ [`icon-${iconPosition}`]: true }"
    @click="$emit('click')"
  >
    <o-icon class="icon" v-if="icon && !loading" :name="icon"></o-icon>
    <o-icon class="loading icon" v-if="loading" name="loading"></o-icon>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
import Icon from './Icon';
export default {
  name: 'OkyriButton',
  props: {
    icon: {},
    loading: {
      type: Boolean,
      default: false,
    },
    iconPosition: {
      type: String,
      default: 'left',
      validator: function(value) {
        return ['left', 'right'].indexOf(value) !== -1;
      },
    },
  },
  components: {
    'o-icon': Icon, // 局部注册 o-icon，否则单文件测试时找不到 o-icon
  },
};
</script>

<style lang="scss" scoped>
@import 'base';
.o-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle; // 内联元素不对齐使用 vertical-align
  height: $height;
  font-size: $font-size;
  padding: 0 1em;
  border-radius: $border-radius;
  border: 1px solid $border-color;
  background-color: $button-bg;

  &:hover {
    border-color: $border-color-hover;
  }

  &:active {
    background-color: $button-active-bg;
  }

  &:focus {
    outline: none;
  }

  > .icon {
    order: 1;
    margin-right: 0.2em;
  }
  > .content {
    order: 2;
  }

  &.icon-right {
    > .icon {
      order: 2;
      margin-left: 0.2em;
      margin-right: 0;
    }
    > .content {
      order: 1;
    }
  }

  .loading {
    animation: spinning 1.5s linear infinite;
  }

  @keyframes spinning {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
