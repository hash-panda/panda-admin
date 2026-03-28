import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface UserInfo {
  id: string;
  username: string;
  nickname: string;
  avatar?: string;
  email?: string;
  roles: string[];
  permissions: string[];
}

export const useUserStore = defineStore('user', () => {
  // Token
  const token = ref<string>('');

  // 用户信息
  const userInfo = ref<UserInfo | null>(null);

  // Actions
  const setToken = (t: string) => {
    token.value = t;
    // 持久化到 localStorage
    if (t) {
      localStorage.setItem('token', t);
    } else {
      localStorage.removeItem('token');
    }
  };

  const setUserInfo = (info: UserInfo) => {
    userInfo.value = info;
  };

  const logout = () => {
    token.value = '';
    userInfo.value = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  const getToken = () => {
    if (!token.value) {
      token.value = localStorage.getItem('token') || '';
    }
    return token.value;
  };

  return {
    token,
    userInfo,
    setToken,
    setUserInfo,
    logout,
    getToken
  };
});
