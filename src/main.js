/**
 * ============================================================================
 * AMO VOCÊS DOIS PRA SEMPRE — APPLICATION BOOTSTRAP ENTRY POINT
 * ============================================================================
 */

import './styles/designSystem.css';
import { App } from './app.js';

function bootstrap() {
  const mountPoint = document.getElementById('app');
  if (mountPoint) {
    if (window.__AMO_APP__ && typeof window.__AMO_APP__.destroy === 'function') {
      window.__AMO_APP__.destroy();
    }
    const appInstance = new App(mountPoint);
    window.__AMO_APP__ = appInstance;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
