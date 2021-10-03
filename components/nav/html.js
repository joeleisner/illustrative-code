import { html, Icon } from '../../shared/html.js';

// Render a nav anchor link
export function LinkAnchor({ icon, text, ...attributes }) {
    return html`
        <a ${ attributes }>
            ${ Icon({ icon }) }
            <span class="nav__text">
                ${ text }
            </span>
        </a>
    `;
}

// Render a nav button link
export function LinkButton({ icon, text, ...attributes }) {
    return html`
        <button ${ attributes }>
            ${ Icon({ icon }) }
            <span class="nav__text">
                ${ text }
            </span>
        </button>
    `;
}

// Render a nav link
export function Link(instructions) {
    const {
        type = 'link',
        id,
        to,
        title,
        icon,
        text,
        active = false
    } = instructions;

    let classes = [ 'nav__link' ];

    if (active) classes.push('nav__link--active');

    const attributes = {
        id,
        class: classes.join(' '),
        title,
        'aria-label': title,
        icon,
        text
    };

    if (type === 'link') {
        const external = to.includes('http');
        const rel = external ? 'noopener noreferrer' : null;
        const target = external ? '_blank' : null;

        return LinkAnchor(Object.assign({
            href: to,
            rel,
            target
        }, attributes));
    }

    if (type === 'button') return LinkButton(Object.assign({
        'aria-controls': to
    }, attributes));
}

// Render the nav component
export function Nav({ links = [], shadow = true }) {
    let classes = [ 'nav' ];

    if (!shadow) classes.push('nav--shadowless');

    return html`
        <nav class="${ classes.join(' ') }">
            <div class="nav__container">
                ${ links.map(Link) }
            </div>
        </nav>
    `;
}