import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Pint o\' Beer';

const description = 'This example was made for day 21 of the Oct. 2017 Creative Sprint. The prompt was to ask someone to tell you a story about their day and make something inspired by it! Instead of asking a friend for a story, I based the prompt on what a friend and I did that day: We went to an event where we drank beer, ate pickles, and pet some dogs (also, since this is prompt 21, pun intended).';

const date = '2017/10/21';

const demo = html`
    <!-- Glass -->
    <div id="glass">
        <div class="beer">
            <div class="head"></div>
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