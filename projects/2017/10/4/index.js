import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Plastic Bag';

const description = 'This example was made for day 4 of the Oct. 2017 Creative Sprint. The prompt was to create something using disposable plastic bags as your primary material. I decided to take things digital and make a plastic bag from HTML and CSS.';

const date = '2017/10/4';

const demo = html`
    <!-- Bag -->
    <div id="bag">
        <div class="cutout"></div>
        <ul class="text">
            <li class="outline caps">Thank you</li>
            <li class="outline caps">Thank you</li>
            <li class="outline caps">Thank you</li>
            <li class="caps">Thank you</li>
            <li class="outline caps">Thank you</li>
            <li class="outline caps">Thank you</li>
            <li class="outline caps">Thank you</li>
            <li class="tiny right">Have a nice day</li>
        </ul>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});