import { describe, it, expect } from 'vitest'
import { transformRoutes, loadComponent, registerComponent } from '../routeTransform'
import type { BackendRoute } from '../../types/route'

describe('routeTransform', () => {
  describe('loadComponent', () => {
    it('should return Layout component for "Layout" string', () => {
      const component = loadComponent('Layout')
      expect(component).toBeDefined()
      expect(typeof component).toBe('function')
    })

    it('should return undefined for unknown component', () => {
      const component = loadComponent('UnknownComponent')
      expect(component).toBeUndefined()
    })
  })

  describe('transformRoutes', () => {
    it('should transform simple route', () => {
      const backendRoutes: BackendRoute[] = [{
        id: 1,
        path: '/dashboard',
        name: 'Dashboard',
        component: 'Dashboard'
      }]

      const result = transformRoutes(backendRoutes)
      expect(result).toHaveLength(1)
      expect(result[0].path).toBe('/dashboard')
      expect(result[0].name).toBe('Dashboard')
      expect(result[0].component).toBeDefined()
    })

    it('should transform nested routes recursively', () => {
      const backendRoutes: BackendRoute[] = [{
        id: 1,
        path: '/system',
        component: 'Layout',
        children: [{
          id: 2,
          path: 'user',
          name: 'UserManagement',
          component: 'UserManagement'
        }]
      }]

      const result = transformRoutes(backendRoutes)
      expect(result).toHaveLength(1)
      expect(result[0].children).toHaveLength(1)
      expect(result[0].children?.[0].path).toBe('user')
    })

    it('should handle route with meta', () => {
      const backendRoutes: BackendRoute[] = [{
        id: 1,
        path: '/dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }]

      const result = transformRoutes(backendRoutes)
      expect(result[0].meta).toEqual({ title: 'Dashboard', icon: 'dashboard' })
    })

    it('should handle route with redirect', () => {
      const backendRoutes: BackendRoute[] = [{
        id: 1,
        path: '/',
        redirect: '/dashboard'
      }]

      const result = transformRoutes(backendRoutes)
      expect(result[0].redirect).toBe('/dashboard')
    })
  })

  describe('registerComponent', () => {
    it('should register and use custom component', () => {
      const mockLoader = () => Promise.resolve({})
      registerComponent('CustomComponent', mockLoader)
      const component = loadComponent('CustomComponent')
      expect(component).toBe(mockLoader)
    })
  })
})
