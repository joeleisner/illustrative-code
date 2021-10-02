import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'iPhone 7+';

const description = 'This example was made for day 18 of the Oct. 2017 Creative Sprint. The prompt was to take something you use every day and remake it using completely different materials. I built my matte-black iPhone 7+ in HTML/CSS.';

const date = '2017/10/18';

const demo = html`
    <!-- Phone -->
    <div id="phone">
        <div class="face">
            <div class="forehead">
                <div class="bar">
                    <div class="camera"></div>
                    <div class="speaker"></div>
                </div>
            </div>
            <div class="screen"></div>
            <div class="chin">
                <div class="home-btn"></div>
            </div>
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