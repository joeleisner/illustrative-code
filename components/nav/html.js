import { html } from '../../shared/html.js';

// Render a nav anchor link
export function LinkAnchor({ text, ...attributes }) {
    return html`
        <a ${ attributes }>
            <span class="nav__text">
                ${ text }
            </span>
        </a>
    `;
}

// Render a nav button link
export function LinkButton({ text, ...attributes }) {
    return html`
        <button ${ attributes }>
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
        family,
        text,
        active = false
    } = instructions;

    let classes = [ 'nav__link' ];

    if (active) classes.push('nav__link--active');

    if (type === 'link') {
        const external = to.includes('http');
        const rel = external ? 'noopener noreferrer' : false;
        const target = external ? '_blank' : false;

        return LinkAnchor({
            id,
            href: to,
            class: classes.join(' '),
            title,
            'aria-label': title,
            rel,
            target,
            'data-icon': icon,
            'data-family': family,
            text
        });
    }

    if (type === 'button') return LinkButton({
        id,
        class: classes.join(' '),
        'aria-controls': to,
        title,
        'aria-label': title,
        'data-icon': icon,
        'data-family': family,
        text
    });
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