import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Ruby';

const description = 'This example was made for day 22 of the Oct. 2017 Creative Sprint. The prompt was to create something inspired by a piece of spam e-email that I recently received. I receive countless spam emails regarding the riches I will inherit from some Nigerian prince, so I decided to make a minimalistic ruby.';

const date = '2017/10/22';

const demo = html`
    <!-- Ruby -->
    <div id="ruby">
        <div class="top">
            <div class="triangle"></div>
            <div class="triangle"></div>
            <div class="triangle"></div>
        </div>
        <div class="bottom">
            <div class="triangle"></div>
            <div class="triangle"></div>
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