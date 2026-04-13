import { defineStore } from 'pinia'

export interface UserState {
  token: string
  userInfo: {
    id: string
    username: string
    email: string
    avatar?: string
    roles: string[]
    permissions: string[]
  } | null
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    username: (state) => state.userInfo?.username || '',
    avatar: (state) => state.userInfo?.avatar || '',
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo
    },

    logout() {
      this.token = ''
      this.userInfo = null
    },
  },
})
