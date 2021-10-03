import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Black Cat';

const description = 'A Black Cat made with CSS & HTML.';

const date = '2021/10/3';

const demo = html`
    <!-- Cat -->
    <div id="cat">
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="eye left">
            <div class="pupil"></div>
        </div>
        <div class="eye right">
            <div class="pupil"></div>
        </div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});