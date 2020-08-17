<template>
  <div class="tabs-item" :class="tabItemClasses" @click="xxx">
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
      };
    },
  },
  methods: {
    xxx() {
      this.eventBus.$emit('update:selected', this.name);
    },
  },
  created() {
    this.eventBus.$on('update:selected', (name) => {
      this.active = name === this.name;
    });
  },
};
</script>

<style lang="scss" scoped>
.tabs-item {
  flex-shrink: 0;
  padding: 8px 0;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 24px;
  }

  &.active {
    background-color: red;
  }
}
</style>
