import type { Router } from 'vue-router';

export function createProgressGuard(router: Router) {
  router.beforeEach(() => {
    // TODO: Add progress bar (NProgress)
    return true;
  });

  router.afterEach(() => {
    // TODO: Hide progress bar
    return true;
  });
}
