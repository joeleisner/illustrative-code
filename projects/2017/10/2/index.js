import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Hammer & Anvil';

const description = 'This example was made for day 2 of the Oct. 2017 Creative Sprint. The prompt was to make something representing the origins or meanings of your name. I decided to focus on my last name (which means iron worker in German), and built an animated hammer/anvil.';

const date = '2017/10/2';

const demo = html`
    <!-- Hammer -->
    <div id="hammer">
        <div class="head"></div>
        <div class="handle"></div>
    </div>
    <!-- Anvil -->
    <div id="anvil">
        <div class="horn"></div>
        <div class="body">
            <div class="right-cutout"></div>
            <div class="bottom-cutout"></div>
            <div class="left-cutout"></div>
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