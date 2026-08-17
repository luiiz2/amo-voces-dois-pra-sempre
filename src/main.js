/**
 * ============================================================================
 * EU AMO VOCÊS DOIS — SINGLE-SCREEN ROMANTIC SCRAPBOOK GIFT
 * ============================================================================
 */

import { RomanticScrapbookApp } from './romanticScrapbookApp.js';

function bootstrap() {
  const mountPoint = document.getElementById('app');
  if (mountPoint) {
    if (window.__ROMANTIC_APP__ && typeof window.__ROMANTIC_APP__.destroy === 'function') {
      window.__ROMANTIC_APP__.destroy();
    }
    const appInstance = new RomanticScrapbookApp(mountPoint);
    window.__ROMANTIC_APP__ = appInstance;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
