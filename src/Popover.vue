<template>
  <div class="popover" ref="popover">
    <div
      ref="contentWrapper"
      class="content-wrapper"
      v-if="visible"
      :class="{ [`position-${position}`]: true }"
    >
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper" class="triggerWrapper">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'OkyriPopover',
  data: function () {
    return {
      visible: false,
    };
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator: (val) => {
        return ['top', 'bottom', 'left', 'right'].indexOf(val) !== -1;
      },
    },
    trigger: {
      type: String,
      default: 'click',
      validator: (val) => {
        return ['click', 'hover'].indexOf(val) !== -1;
      },
    },
  },
  mounted() {
    if (this.trigger === 'click') {
      this.$refs.popover.addEventListener('click', this.handleClick);
    } else {
      this.$refs.popover.addEventListener('mouseenter', this.open);
      this.$refs.popover.addEventListener('mouseleave', this.close);
    }
  },
  destroyed() {
    if (this.trigger === 'click') {
      this.$refs.popover.removeEventListener('click', this.handleClick);
    } else {
      this.$refs.popover.removeEventListener('mouseenter', this.open);
      this.$refs.popover.removeEventListener('mouseleave', this.close);
    }
  },
  methods: {
    positionContent: function () {
      const {
        contentWrapper: contWrapperRef,
        triggerWrapper: triggerWrapperRef,
      } = this.$refs;
      // 确保渲染后，可以获取引用，此时将其移到body里面
      document.body.appendChild(contWrapperRef);
      const {
        left,
        top,
        width,
        height,
      } = triggerWrapperRef.getBoundingClientRect();
      const { height: h } = contWrapperRef.getBoundingClientRect();
      // 页面发生滚动时，需添加滚动偏移
      const positions = {
        top: {
          top: top + window.scrollY,
          left: left + window.screenX,
        },
        bottom: {
          top: top + height + window.scrollY,
          left: left + window.screenX,
        },
        left: {
          top: top + window.scrollY + (height - h) / 2,
          left: left + window.screenX,
        },
        right: {
          top: top + window.scrollY + (height - h) / 2,
          left: left + window.screenX + width,
        },
      };
      contWrapperRef.style.left = positions[this.position].left + 'px';
      contWrapperRef.style.top = positions[this.position].top + 'px';
    },
    onClickDocument(e) {
      // 监听函数需要点击的内容是除了 popover 以及 content 其他的内容
      if (
        this.$refs.popover &&
        (this.$refs.popover.contains(e.target) ||
          this.$refs.popover === e.target)
      ) {
        return;
      }
      if (
        this.$refs.contentWrapper &&
        (this.$refs.contentWrapper.contains(e.target) ||
          this.$refs.contentWrapper === e.target)
      ) {
        return;
      }
      this.close();
    },
    open: function () {
      this.visible = true;
      this.$nextTick(() => {
        this.positionContent();
        // 此处的 this 就是指组件，而不是 document
        document.addEventListener('click', this.onClickDocument);
      });
    },
    close: function () {
      this.visible = false;
      document.removeEventListener('click', this.onClickDocument);
    },
    handleClick: function (event) {
      // node.contains 表示传入的节点是否为该节点的后代节点
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible) {
          this.close();
        } else {
          this.open();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #333;
$border-radius: 4px;
.popover {
  display: inline-block;
  vertical-align: top;

  .triggerWrapper {
    display: inline-block;
  }
}
.content-wrapper {
  position: absolute;
  border: 1px solid $border-color;
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5)); // 注意兼容性
  background-color: #fff;
  border-radius: $border-radius;

  padding: 0.5em 1em;
  max-width: 20em;
  word-break: break-all;

  &::before,
  &::after {
    content: '';
    border: 10px solid transparent;
    width: 0;
    height: 0;
    position: absolute;
  }

  &.position-top {
    transform: translateY(-100%);
    margin-top: -10px;

    &::before {
      top: 100%;
      border-top-color: black;
    }
    &::after {
      top: calc(100% - 1px);
      border-top-color: white;
    }
  }

  &.position-bottom {
    margin-top: 10px;

    &::before {
      bottom: 100%;
      border-bottom-color: black;
    }
    &::after {
      bottom: calc(100% - 1px);
      border-bottom-color: white;
    }
  }

  &.position-left {
    transform: translateX(-100%);
    margin-left: -10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      left: 100%;
      border-left-color: black;
    }
    &::after {
      left: calc(100% - 1px);
      border-left-color: white;
    }
  }

  &.position-right {
    margin-left: 10px;
    &::before,
    &::after {
      top: 50%;
      transform: translateY(-50%);
    }

    &::before {
      right: 100%;
      border-right-color: black;
    }
    &::after {
      right: calc(100% - 1px);
      border-right-color: white;
    }
  }
}
</style>
