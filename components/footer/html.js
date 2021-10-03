import { html, Icon } from '../../shared/html.js';

import heart from '@fortawesome/fontawesome-free/svgs/solid/heart.svg';

export function Footer() {
    return html`
        <footer class="footer">
            <div class="footer__container">
                <p>${[
                    'This site was made with',
                    Icon({ icon: heart, text: 'love' }),
                    'by Joel Eisner and is',
                    html`<a href="https://www.w3.org/TR/WCAG21/" rel="noopener noreferrer" target="_blank">WCAG 2.1 AAA</a>`,
                    'accessible'
                ]}</p>
            </div>
        </footer>
    `;
}