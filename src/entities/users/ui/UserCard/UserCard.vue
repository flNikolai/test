<template>
  <div>
    <the-message v-show="isDetailsLoading"
                 isCenter>
      <img width="50"
           :src="SpinnerIMG"
           alt="IMG - загрузка" >
    </the-message>

    <transition name="fade"
                mode="out-in">
      <div v-show="!isDetailsLoading"
           class="user">
        <div class="user__inner">
          <div class="user__image">
            <img :src="IMAGE"
                 :alt="user?.username" >
          </div>
          <div class="user__text">
            <h3 class="user__name">{{ user?.name }}</h3>
            <p class="user__email">
              email: <span>{{ user?.email }}</span>
            </p>
            <p class="user__phone">
              phone: <span>{{ user?.phone }}</span>
            </p>

            <h3 class="company">О компании</h3>
            <p class="company__name">
              name: <span>{{ user?.company?.name }}</span>
            </p>
            <p class="company__catchphrase">
              catch phrase: <span>{{ user?.company?.catchPhrase }}</span>
            </p>
            <p class="company__bs">
              bs: <span>{{ user?.company?.bs }}</span>
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { User } from '@/shared/api'
import { TheMessage } from '@/shared/ui'
import { userModel } from '../../../users'
import IMAGE from './assets/img-big.png'
import SpinnerIMG from './assets/spinner.svg'

const store = useStore()
const route = useRoute()
const router = useRouter()

const userId = route.params.userId

const getUserByIdAsync = () =>
  store.dispatch(userModel.actions.getUserByIdAsync, userId)
onMounted(async () => {
  const result = await getUserByIdAsync()
  if (result?.response?.status === 404) {
    router.push({ name: 'Home' })
  }
})

const user = computed(() => store.state[userModel.NAMESPACE].user as User)
const isDetailsLoading = computed(
  () => store.state[userModel.NAMESPACE].isDetailsLoading
)
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
