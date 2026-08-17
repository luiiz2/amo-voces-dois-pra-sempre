/**
 * ============================================================================
 * LUIZ — JUNK JOURNAL / HANDMADE SCRAPBOOK APPLICATION ENTRY POINT
 * ============================================================================
 */

import { ScrapbookApp } from './scrapbookApp.js';

function bootstrap() {
  const mountPoint = document.getElementById('app');
  if (mountPoint) {
    new ScrapbookApp(mountPoint);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
