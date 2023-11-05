<template>
  <input-text
    v-model="q"
    id="search-user"
    placeholder="Введите Id или Username"
    label="Поиск сотрудников"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { InputText } from '@/shared/ui'

const emits = defineEmits(['changeSearch'])

const q = ref<string>('')

watch(q, (text) => {
  emits('changeSearch', text)
})
</script>

<style scoped></style>
