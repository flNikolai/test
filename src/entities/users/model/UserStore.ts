import { typicodeApi } from '@/shared/api'
import type { User } from '@/shared/api'

export const NAMESPACE = 'users'

const IS_NAMESPACED = true

type State = TodoState

export interface TodoState {
  data: User[]
  user: User
  isListLoading: boolean
  isDetailsLoading: boolean
}

export const module = {
  namespaced: IS_NAMESPACED,

  state: {
    data: [],
    user: {},
    isListLoading: false,
    isDetailsLoading: false
  },

  getters: {
    isUsersListEmpty: (state: State) => !state.data.length,
    getUserById: (state: State) => (id: number) =>
      state.data.find((user) => user.id === id) || null
  },

  mutations: {
    setListLoading: (state: State, isLoading: boolean) => {
      state.isListLoading = isLoading
    },
    setDetailsLoading: (state: State, isLoading: boolean) => {
      state.isDetailsLoading = isLoading
    },
    addUserToList: (state: State, response: any) => {
      state.data = response?.data
    },
    addUser: (state: State, response: any) => {
      state.user = response?.data
    },
    clearUserToList: (state: State) => {
      state.data = []
    }
  },

  actions: {
    getUsersByIdAsync: async ({ commit }: any, params: any) => {
      commit('setListLoading', true)

      const ids = params.split(',')
      const queryParams = ids
        .map((id: any) => {
          id = id.trim()

          if (/^\d+$/.test(id)) {
            return `id=${id}`
          } else {
            return `username=${id}`
          }
        })
        .join('&')

      const result = `?${queryParams}`

      try {
        commit('addUserToList', await typicodeApi.users.getUserkById(result))
      } catch (e) {
        console.warn(e)
        return e
      } finally {
        commit('setListLoading', false)
      }
    },
    getUserByIdAsync: async ({ commit }: any, params: any) => {
      commit('setDetailsLoading', true)

      try {
        commit('addUser', await typicodeApi.users.getUserkById(params))
      } catch (e) {
        console.warn(e)
        return e
      } finally {
        commit('setDetailsLoading', false)
      }
    }
  }
}

const withPrefix = (name: string) =>
  IS_NAMESPACED ? `${NAMESPACE}/${name}` : name

export const actions = {
  getUsersByIdAsync: withPrefix('getUsersByIdAsync'),
  getUserByIdAsync: withPrefix('getUserByIdAsync')
}
export const mutations = {
  clearUserToList: withPrefix('clearUserToList')
}
export const getters = {
  isUsersListEmpty: withPrefix('isUsersListEmpty'),
  getUserById: withPrefix('getUserById')
}
