<template>
  <div class="popover" @click="handleClick" ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
  methods: {
    positionContent: function () {
      // 确保渲染后，可以获取引用，此时将其移到body里面
      document.body.appendChild(this.$refs.contentWrapper);
      const {
        left,
        top,
        width,
        height,
      } = this.$refs.triggerWrapper.getBoundingClientRect();
      // 页面发生滚动时，需添加滚动偏移
      this.$refs.contentWrapper.style.left = `${left + window.screenX}px`;
      this.$refs.contentWrapper.style.top = `${top + window.scrollY}px`;
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
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  background-color: #fff;
  border-radius: $border-radius;
  transform: translateY(-100%);
  margin-top: -10px;
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

  &::before {
    top: 100%;
    border-top-color: black;
  }
  &::after {
    top: calc(100% - 1px);
    border-top-color: white;
  }
}
</style>
