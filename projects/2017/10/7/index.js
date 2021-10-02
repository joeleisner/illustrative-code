import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Composition II in Red, Blue, and Yellow';

const description = 'This example was made for day 7 of the Oct. 2017 Creative Sprint. The prompt was to use recreate a famous work of art using a material and technique of your choice. I recreated Piet Mondrian’s Composition II in Red, Blue, and Yellow.';

const date = '2017/10/7';

const demo = html`
    <!-- Composition -->
    <div id="composition">
        <div class="row">
            <div class="group">
                <div class="rect-a white"></div>
                <div class="rect-b white"></div>
            </div>
            <div class="rect-c red"></div>
        </div>
        <div class="row">
            <div class="rect-d blue"></div>
            <div class="rect-e white"></div>
            <div class="group">
                <div class="rect-f white"></div>
                <div class="rect-g yellow"></div>
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