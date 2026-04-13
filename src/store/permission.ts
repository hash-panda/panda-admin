import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

export interface PermissionState {
  routes: RouteRecordRaw[]
  addRoutes: RouteRecordRaw[]
  permissions: string[]
  roles: string[]
}

export const usePermissionStore = defineStore('permission', {
  state: (): PermissionState => ({
    routes: [],
    addRoutes: [],
    permissions: [],
    roles: [],
  }),

  getters: {
    hasPermission: (state) => (permission: string) => {
      return state.permissions.includes(permission)
    },
    hasRole: (state) => (role: string) => {
      return state.roles.includes(role)
    },
  },

  actions: {
    setRoutes(routes: RouteRecordRaw[]) {
      this.addRoutes = routes
      this.routes = routes
    },

    setPermissions(permissions: string[]) {
      this.permissions = permissions
    },

    setRoles(roles: string[]) {
      this.roles = roles
    },

    hasAnyPermission(permissions: string[]): boolean {
      return permissions.some((p) => this.permissions.includes(p))
    },

    hasAnyRole(roles: string[]): boolean {
      return roles.some((r) => this.roles.includes(r))
    },
  },
})
