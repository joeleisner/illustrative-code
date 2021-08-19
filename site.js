import { Nav } from './components/nav/index.js';
import { Card } from './components/card/index.js';

// Initialize all functionality
function initialize() {
    const components = [ Nav, Card ];

    components.forEach(Component => (new Component()).start());
}

// When the DOM is loaded, initialize all functionality
document.addEventListener('DOMContentLoaded', initialize);