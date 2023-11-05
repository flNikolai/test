<template>
  <aside class="sidebar">
    <div class="sidebar__inner">
      <search-user @changeSearch="changeSearch" />

      <div class="result">
        <h3 class="title">Результаты</h3>

        <transition name="fade">
          <the-message v-show="isListLoading"
                       isCenter>
            <img width="50"
                 :src="SpinnerIMG"
                 alt="IMG - загрузка" >
          </the-message>
        </transition>
        <transition name="fade">
          <the-message v-show="NotFoundMessage">ничего не найдено </the-message>
        </transition>
        <transition name="fade">
          <the-message v-show="StartSearchingMessage"
          >начните поиск
          </the-message>
        </transition>

        <div v-show="!isListLoading"
             class="users">
          <transition-group name="fade">
            <template v-for="user in filteredUsers"
                      :key="user.id">
              <user-list :data="user" />
            </template>
          </transition-group>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { SearchUser } from '@/features/SearchUser'
import { userModel, UserList } from '@/entities/users'
import { TheMessage } from '@/shared/ui'
import SpinnerIMG from './assets/spinner.svg'

const store = useStore()
const router = useRouter()

const search = ref<string>('')

watch(
  () => search.value,
  async () => {
    if (Object.keys(search.value).length) {
      await store.dispatch(userModel.actions.getUsersByIdAsync, search.value)
    } else {
      store.commit(userModel.mutations.clearUserToList)
      router.push({ name: 'Home' })
    }
  }
)

const isListLoading = computed(
  () => store.state[userModel.NAMESPACE].isListLoading
)
const filteredUsers = computed(() => store.state[userModel.NAMESPACE].data)
const isUsersListEmpty = computed(
  () => store.getters[userModel.getters.isUsersListEmpty]
)

const NotFoundMessage = computed(
  () => isUsersListEmpty.value && !isListLoading.value && search.value
)
const StartSearchingMessage = computed(
  () => isUsersListEmpty.value && !isListLoading.value && !search.value
)

const changeSearch = (event: string) => {
  search.value = event
}
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
