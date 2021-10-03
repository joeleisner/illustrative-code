import { html, Icon } from '../../shared/html.js';

export function Footer() {
    return html`
        <footer class="footer">
            <div class="footer__container">
                <p>This site was made with ${ Icon({ icon: 'heart', text: 'love' }) }  by Joel Eisner and is <a href="https://www.w3.org/TR/WCAG21/" rel="noopener noreferrer" target="_blank">WCAG 2.1 AAA</a> accessibile.</p>
            </div>
        </footer>
    `;
}