<template>
  <div class="collapse-item">
    <div class="title" @click="toggle">
      {{ title }}
    </div>
    <div class="content" v-if="open">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OkyriCollapseItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      open: false,
      single: false,
    };
  },
  inject: ['eventBus'],
  mounted() {
    this.eventBus &&
      this.eventBus.$on('update:selected', (name) => {
        if (name !== this.name) {
          if (this.single) {
            this.hide();
          }
        } else {
          this.show();
        }
      });
  },
  methods: {
    toggle() {
      if (!this.open) {
        this.eventBus && this.eventBus.$emit('update:selected', this.name);
      } else {
        this.hide();
      }
    },
    hide() {
      this.open = false;
    },
    show() {
      this.open = true;
    },
  },
};
</script>

<style lang="scss" scoped>
$border-color: #ddd;
$border-radius: 4px;
.collapse-item {
  border-bottom: 1px solid $border-color;

  > .title {
    border-bottom: 1px solid $border-color;
    min-height: 32px;
    display: flex;
    align-items: center;
    padding: 0 8px;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }
  }

  > .content {
    padding: 8px;
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
