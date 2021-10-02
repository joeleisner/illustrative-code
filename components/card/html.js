import { root } from '../../config.js';
import { html, slug } from '../../shared/html.js';

// Render the card component
export function Card({ path, title }) {
    // Generate the image path...
    const imagePath = `${ root }images/${ slug(path, '/') }`;
    // ... and use it to define the tiny/large image variants
    const image = {
        tiny: imagePath + '.tiny.jpg',
        large: imagePath + '.jpg'
    };

    // Generate the project path
    const project = `${ root }projects/${ path }/`;

    // Finally, render the card component
    return html`
        <a class="card" href="${ project }">
            <div class="card__wrap card__wrap--loading">
                <img class="card__image card__image--loading"
                    src="${ image.tiny }"
                    data-src="${ image.large }"
                    alt="${ title }"
                    aria-label="${ title }"
                    width="260px"
                    height="260px">
            </div>
        </a>
    `;
}