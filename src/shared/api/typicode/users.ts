import type { AxiosPromise } from 'axios'
import { apiInstance } from './base'
import type { User } from './models'

const BASE_URL = '/users'

export const getUserkById = (params): AxiosPromise<User> => {
  return apiInstance.get(`${BASE_URL}/${params}`)
}
