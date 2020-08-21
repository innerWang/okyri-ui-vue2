<template>
  <div class="collapse-item" :data-item="name">
    <div class="title" @click="toggle">
      {{ title }}
    </div>
    <div class="content" v-if="open" ref="content">
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
      this.eventBus.$on('update:selected', (names) => {
        if (names.indexOf(this.name) >= 0) {
          this.open = true;
        } else {
          this.open = false;
        }
      });
  },
  methods: {
    toggle() {
      if (!this.open) {
        this.eventBus && this.eventBus.$emit('update:addSelected', this.name);
      } else {
        this.eventBus &&
          this.eventBus.$emit('update:removeSelected', this.name);
      }
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
    background: lighten($border-color, 8%);

    &:last-child {
      border-bottom: none;
    }
  }

  > .content {
    padding: 8px;
  }

  &:first-child {
    > .title {
      border-top-left-radius: $border-radius;
      border-top-right-radius: $border-radius;
    }
  }

  &:last-child {
    border-bottom: none;
    > .title:last-child {
      border-bottom-left-radius: $border-radius;
      border-bottom-right-radius: $border-radius;
    }
  }
}
</style>
