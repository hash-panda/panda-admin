import { Router } from 'vue-router'
import { setupRouteGuard } from './routeGuard'
import { setupPermissionGuard } from './permissionGuard'
import { setupProgressGuard } from './progressGuard'

export function setupGuards(router: Router) {
  setupRouteGuard(router)
  setupPermissionGuard(router)
  setupProgressGuard(router)
}
