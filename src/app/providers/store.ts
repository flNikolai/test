import { createStore } from 'vuex'
import { userModel } from '@/entities/users'
import { isDevEnv } from '@/shared/config'

export const store = createStore({
  strict: !!isDevEnv,
  modules: {
    [userModel.NAMESPACE]: userModel.module
  }
})
