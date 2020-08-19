<template>
  <div class="popover" @click.stop="xxx">
    <div
      ref="contentWrapper"
      class="content-wrapper"
      v-if="visible"
      @click.stop
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
  methods: {
    xxx: function () {
      this.visible = !this.visible;
      if (this.visible) {
        this.$nextTick(() => {
          // 确保渲染后，将其移到body里面
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
          const clickEventHandle = () => {
            this.visible = false;
            document.removeEventListener('click', clickEventHandle);
          };
          document.addEventListener('click', clickEventHandle);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popover {
  display: inline-block;
  vertical-align: top;

  .triggerWrapper {
    display: inline-block;
  }
}
.content-wrapper {
  position: absolute;
  border: 1px solid #666;
  box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.5);
  transform: translateY(-100%);
}
</style>
