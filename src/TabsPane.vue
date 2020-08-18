<template>
  <div class="tabs-pane" :class="tabPaneClasses" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OkyriTabsPane',
  inject: ['eventBus'],
  data: function () {
    return {
      active: false,
    };
  },
  props: {
    name: {
      type: [String, Number],
      required: true,
    },
  },
  computed: {
    tabPaneClasses: function () {
      return {
        active: this.active,
      };
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
.tabs-pane {
  padding: 1em;
  &.active {
  }
}
</style>
