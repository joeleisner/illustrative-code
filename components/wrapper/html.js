import { html } from '../../shared/html.js';

export function Wrapper(...children) {
    return html`
        <div class="wrapper">
            ${ children }
        </div>
    `;
}