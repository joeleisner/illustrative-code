import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Rainbow Loader';

const description = 'This example was made for day 11 of the Oct. 2017 Creative Sprint. I decided to build another HTML/CSS loader with a rainbow, bouncy-ball wave.';

const date = '2017/10/11';

const demo = html`
    <!-- Loader -->
    <div id="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
    <!-- Shadows -->
    <div id="shadows">
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
        <div class="shadow"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});