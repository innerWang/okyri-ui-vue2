<template>
  <div class="popover" @click.stop="xxx">
    <div class="content-wrapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
  position: relative;

  .content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid #666;
    box-shadow: 0 0 3px rgba($color: #000000, $alpha: 0.5);
  }
}
</style>
