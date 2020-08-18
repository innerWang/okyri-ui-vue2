<template>
  <div
    class="tabs-item"
    :class="tabItemClasses"
    @click="handleClick"
    :data-name="name"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabsItem',
  inject: ['eventBus'],
  data: function () {
    return {
      active: false,
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    tabItemClasses: function () {
      return {
        active: this.active,
        disabled: this.disabled,
      };
    },
  },
  methods: {
    handleClick() {
      if (this.disabled) return;
      this.eventBus && this.eventBus.$emit('update:selected', this.name, this);
      this.$emit('click', this);
    },
  },
  created() {
    if (this.eventBus) {
      this.eventBus.$on('update:selected', (name) => {
        this.active = name === this.name;
      });
    }
  },
};
</script>

<style lang="scss" scoped>
$primary-color: blue;
$disabled-text-color: grey;
.tabs-item {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 0 2em;
  cursor: pointer;

  &.active {
    color: $primary-color;
    font-weight: 500;
  }

  &.disabled {
    color: $disabled-text-color;
    cursor: not-allowed;
  }
}
</style>
