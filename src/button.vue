<template>
  <button class="okyri-button" :class="{ [`icon-${iconPosition}`]: true }">
    <svg v-if="icon" class="icon">
      <use :xlink:href="`#i-${icon}`"></use>
    </svg>
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {},
    iconPosition: {
      type: String,
      default: 'left',
      validator: function(value) {
        return ['left', 'right'].indexOf(value) !== -1;
      }
    }
  }
};
</script>

<style lang="scss">
.okyri-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle; // 内联元素不对齐使用 vertical-align
  height: var(--button-height);
  font-size: var(--font-size);
  padding: 0 1em;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--button-bg);

  &:hover {
    border-color: var(--border-color-hover);
  }

  &:active {
    background-color: var(--button-active-bg);
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
}
</style>
