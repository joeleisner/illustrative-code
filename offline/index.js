import { root } from '../config.js';
import chevronLeftIcon from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import { themeToggle, html, Icon, Base } from '../shared/html.js';
import heartBrokenIcon from '@fortawesome/fontawesome-free/svgs/solid/heart-broken.svg';
import { Panel } from '../components/panel/html.js';

const title = 'Illustrative Code is offline';

const styles = [ root + 'offline/offline.css' ];

const nav = [
    {
        to: root,
        title: 'Back to the Illustrative Code homepage',
        icon: chevronLeftIcon,
        text: 'Back'
    },
    themeToggle
];

const navShadow = false;

const message = html`
    ${ Icon({ icon: heartBrokenIcon }) }
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

export default Base({ title, styles, nav, navShadow, main });