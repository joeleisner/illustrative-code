import { root } from '../config.js';
import { html, Icon, Base } from '../shared/html.js';
import { Panel } from '../components/panel/html.js';

const title = 'Illustrative Code is offline';

const styles = [ root + 'offline/offline.css' ];

const nav = [
    {
        to: root,
        title: 'Back to the Illustrative Code homepage',
        icon: '\uf053',
        text: 'Back'
    },
    {
        type: 'button',
        id: 'nav__toggle',
        title: 'Turn on dark mode',
        icon: '\uf186',
        text: 'Dark mode'
    }
];

const navShadow = false;

const message = html`
    ${ Icon({
        icon: 'heart-broken',
        class: 'fa-10x',
        'aria-hidden': true
    }) }
    <h1>No internet connection</h1>
    <p>This page isn't available offline.</p>
`;

const main = html`
    ${ Panel({
        id: 'offline',
        label: 'Offline',
        visible: true,
        contain: true,
        children: [ message ]
    }) }
`;

const scripts = [ root + 'offline/offline.js' ];

export default Base({ title, styles, nav, navShadow, main, scripts });