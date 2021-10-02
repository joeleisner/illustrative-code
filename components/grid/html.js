import { html } from '../../shared/html.js';

export function Grid(...children) {
    return html`
        <div class="grid">
            ${ children }
        </div>
    `;
}

export function ItemFull(...children) {
    return html`
        <div class="grid__item--full">
            ${ children }
        </div>
    `;
}