import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Speech Bubble';

const description = 'This example was made for day 16 of the Oct. 2017 Creative Sprint. The prompt was to learn a new word and create something that represents it for #nationaldictionaryday. This piece is inspired by conlang (n.) - An invented language.';

const date = '2017/10/16';

const demo = html`
    <!-- Bubble -->
    <div id="bubble">
        <div class="body">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
        <div class="pointer"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});