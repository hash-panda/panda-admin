import type { Router } from 'vue-router';
import { createPageLoadingGuard } from './pageLoadingGuard';
import { createProgressGuard } from './progressGuard';

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router);
  createProgressGuard(router);
}
