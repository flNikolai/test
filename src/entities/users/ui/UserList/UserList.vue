<template>
  <RouterLink
    :to="{ name: 'UserDetails', params: { userId: data?.id } }"
    class="user"
  >
    <div class="user__inner">
      <div class="user__image">
        <img :src="IMAGE"
             :alt="data?.username" >
      </div>
      <div class="user__text">
        <p class="user__name">{{ data?.name }}</p>
        <p class="user__email">{{ data?.email }}</p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { User } from '@/shared/api'
import IMAGE from './assets/img.png'

const route = useRoute()

interface UserProps {
  data: User
}

const props = defineProps<UserProps>()

const { data } = toRefs(props)

const userId = ref()

watch(
  () => route.query.user,
  (newValue) => {
    userId.value = newValue
  }
)
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
