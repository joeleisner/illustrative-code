import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Key';

const description = 'This example was made for day 25 of the Oct. 2017 Creative Sprint. The prompt was to make an homage to or recreate another Sprinter\'s work by searching the Creative Sprint hashtag or Facebook group postings. I decided to make a key out of CSS/HTML inspired by the day 18 prompts by @shapes.and.colors.rva & @westerfeld.';

const date = '2017/10/25';

const demo = html`
    <!-- Key -->
    <div id="key">
        <div class="bow">
            <div class="cutout"></div>
        </div>
        <div class="stem"></div>
        <div class="collar"></div>
        <div class="end">
            <div class="bit"></div>
            <div class="pin"></div>
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