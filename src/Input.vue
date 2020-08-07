<template>
  <div class="wrapper" :class="{ error }">
    <input
      :value="value"
      type="text"
      :disabled="disabled"
      :readonly="readonly"
      @change="$emit('change', $event)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
      @input="$emit('input', $event)"
    />
    <template v-if="error">
      <Icon name="error" class="icon-error"></Icon>
      <span class="errorMessage">{{ error }}</span>
    </template>
  </div>
</template>

<script>
import Icon from './Icon';
export default {
  // name 可以帮助在使用 Vue dev-tools 时快速调试
  // 可在 Chrome 安装 Vue dev-tools，右键 -> 检查 -> Vue 标签页 ，可查看组件名称。
  name: 'OkyriInput',
  props: {
    value: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    error: {
      type: String,
    },
  },
  components: {
    Icon,
  },
};
</script>

<style lang="scss" scoped>
// 使用 scoped 会自动添加一个唯一的属性，为组件内 css 指定作用域
$height: 32px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(#000, 0.5);
$danger-color: #f1453d;
$box-shadow-danger-color: rgba(#f00, 0.5);
.wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
  > :not(:last-child) {
    margin-right: 0.5em;
  }
  > input {
    height: $height;
    border: 1px solid $border-color;
    border-radius: $border-radius;
    padding: 0 8px;
    font-size: inherit;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      outline: none;
      box-shadow: inset 0 1px 3px $box-shadow-color;
    }
    &[disabled],
    &[readonly] {
      border-color: #bbb;
      color: #bbb;
      cursor: not-allowed;
    }
  }

  &.error {
    > input {
      border-color: $danger-color;
      &:focus {
        box-shadow: inset 0 1px 3px $box-shadow-danger-color;
      }
    }

    .icon-error {
      fill: $danger-color;
    }

    .errorMessage {
      color: $danger-color;
    }
  }
}
</style>
