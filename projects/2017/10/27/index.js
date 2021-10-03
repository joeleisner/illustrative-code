import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Ripple Loader';

const description = 'This example was made for day 27 of the Oct. 2017 Creative Sprint. I decided to make a rippling loader.';

const date = '2017/10/27';

const demo = html`
    <!-- Loader -->
    <div id="loader">
        <div class="circle"></div>
        <div class="circle"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});