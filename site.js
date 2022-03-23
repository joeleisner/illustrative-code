import { Nav } from './components/nav/index.js';
import { Card } from './components/card/index.js';

// If service workers are supported, register one
if ('serviceWorker' in navigator) navigator.serviceWorker.register(ROOT + 'service-worker.js');

// Grab the nav and card components...
const components = [ Nav, Card ];
// ... and start each one
components.forEach(Component => (new Component()).start());