import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Creative Sprint Trophy';

const description = 'This example was made for day 30 of the Oct. 2017 Creative Sprint. The prompt was to create a trophy or another type of award to celebrate my Creative Sprint efforts! I created a 30 days of #creativesprint trophy using HTML and CSS.';

const date = '2017/10/30';

const demo = html`
    <!-- Trophy -->
    <div id="trophy">
        <div class="top">
            <div class="handle left"></div>
            <div class="cup"></div>
            <div class="handle right"></div>
        </div>
        <div class="stem">
            <div class="cutout left"></div>
            <div class="cutout right"></div>
        </div>
        <div class="bottom">
            <div class="step">30 days</div>
            <div class="step">#creativesprint</div>
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