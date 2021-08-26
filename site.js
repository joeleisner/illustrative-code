import { root } from './config.js';
import { Nav } from './components/nav/index.js';
import { Card } from './components/card/index.js';

// Register the service worker
function registerServiceWorker() {
    if (!('serviceWorker' in navigator)) return;

    navigator.serviceWorker.register(root + 'service-worker.js');
}

// Initialize all functionality
function initialize() {
    document.removeEventListener('DOMContentLoaded', initialize);

    registerServiceWorker();

    const components = [ Nav, Card ];

    components.forEach(Component => (new Component()).start());
}

// When the DOM is loaded, initialize all functionality
document.addEventListener('DOMContentLoaded', initialize);