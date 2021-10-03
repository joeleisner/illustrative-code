import { html } from '../../shared/html.js';

export function Container(...children) {
    return html`
        <div class="panel__container">
            ${ children }
        </div>
    `;
}

export function Panel({
    id,
    label,
    contain = false,
    visible = false,
    children = []
}) {
    const attributes = {
        id,
        class: 'panel',
        'aria-label': label,
        'aria-hidden': !visible
    };

    return html`
        <section ${ attributes }>
            ${ contain ? Container(...children) : children }
        </section>
    `;
}