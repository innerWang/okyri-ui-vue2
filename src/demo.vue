<template>
  <div>
    <o-button>按钮</o-button>
    <o-input />
  </div>
</template>

<script>
import Button from './Button';
import Input from './Input';
export default {
  name: 'demo',
  components: {
    'o-button': Button,
    'o-input': Input,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
img {
  max-width: 100%;
}
html {
  --font-size: 14px;
}
body {
  font-size: var(--font-size);
  padding: 100px;
}
</style>
