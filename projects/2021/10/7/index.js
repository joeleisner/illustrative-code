import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Skull';

const description = 'A skull made with CSS & HTML.';

const date = '2021/10/7';

const demo = html`
    <!-- Skull -->
    <div id="skull">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="nose"></div>
        <div class="cheek left"></div>
        <div class="cheek right"></div>
        <div class="maxilla"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});