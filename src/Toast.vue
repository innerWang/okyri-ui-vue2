<template>
  <div class="toast" ref="toast" :class="toastClasses">
    <div class="message">
      <slot v-if="!enableHtml"></slot>
      <div v-else v-html="$slots.default[0]"></div>
    </div>
    <span class="line" ref="line"></span>
    <span v-if="closeButton" class="close" @click="onClickClose">
      {{ closeButton.text }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'OkyriToast',
  props: {
    autoClose: {
      type: Boolean,
      default: true,
    },
    autoCloseDelay: {
      type: Number,
      default: 3,
    },
    closeButton: {
      type: Object,
      // props 的类型如果是 Object/ Array，必须使用一个函数返回默认值
      // 这么设计主要是为了避免不同实例的属性指向同一个引用
      default: () => ({
        text: '关闭',
        callback: undefined,
      }),
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'top',
      validator(value) {
        return ['top', 'bottom', 'middle'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    toastClasses: function () {
      return { [`position-${this.position}`]: true };
    },
  },
  mounted() {
    this.updateStyles();
    this.doAutoClose();
  },
  methods: {
    doAutoClose() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close();
        }, this.autoCloseDelay * 1000);
      }
    },
    updateStyles() {
      // 组件在 mount 后的下一步才渲染，所以需要等待 下次 DOM 更新后再去读取样式
      this.$nextTick(function () {
        // 通过内联样式设置线的高度
        this.$refs.line.style.height = window.getComputedStyle(
          this.$refs.toast
        ).height;
      });
    },
    close() {
      this.$el.remove(); // 将元素从其所在的树移除
      this.$destroy(); // 将组件绑定的事件等取消掉，该操作不会将元素从页面移除
    },
    onClickClose() {
      this.close();
      if (this.closeButton && typeof this.closeButton.callback === 'function') {
        this.closeButton.callback(this); // 传回实例
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-bg: rgba(0, 0, 0, 0.75);
$toast-color: #fff;
$toast-box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
$toast-border-radius: 4px;
$toast-padding: 0 16px;
$toast-min-height: 40px;

.toast {
  position: fixed;
  left: 50%;
  display: flex;
  align-items: center;
  padding: $toast-padding;
  min-height: $toast-min-height;
  color: $toast-color;
  font-size: $font-size;
  line-height: 1.8;
  transform: translateX(-50%);
  background-color: $toast-bg;
  border-radius: $toast-border-radius;
  box-shadow: $toast-box-shadow;

  .message {
    padding: 8px 0;
  }

  .line {
    margin: 0 16px;
    border-left: 1px solid #666;
  }
  .close {
    flex-shrink: 0;
  }

  &.position-top {
    top: 20px;
  }
  &.position-bottom {
    bottom: 20px;
  }
  &.position-middle {
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
