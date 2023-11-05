<template>
  <label v-if="props.label"
         class="label"
         :for="props.id">
    {{ props.label }}
  </label>
  <input
    :id="props.id"
    class="input"
    :type="!showPassword ? props.type : 'text'"
    :autocomplete="props.type === 'text' ? 'off' : 'new-password'"
    :placeholder="props.placeholder"
    :disabled="props.isDisabled"
    :readonly="props.isReadonly"
    :value="modelValue"
    @input="updateValue"
  >
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useDebounceFn } from '../../utils/debounce'
import { type Props } from './types'

const props = withDefaults(defineProps<Partial<Props>>(), {
  modelValue: '',
  isDisabled: false,
  isReadonly: false,
  type: 'text'
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const updateValue = useDebounceFn((event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}, 800)
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
