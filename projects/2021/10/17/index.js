import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Ghost';

const description = 'A ghost made with CSS & HTML.';

const date = '2021/10/17';

const demo = html`
    <!-- Ghost -->
    <div id="ghost">
        <div class="eye left"></div>
        <div class="eye right"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});