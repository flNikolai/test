<template>
  <div class="message"
       :class="{ message_center: props.isCenter }">
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isCenter: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
