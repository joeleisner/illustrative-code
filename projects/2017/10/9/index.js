import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Mailbox';

const description = 'This example was made for day 9 of the Oct. 2017 Creative Sprint. The prompt was to create something inspired by the Postal Service and their work for #worldpostday. I built a mailbox with an animated mailbox flag.';

const date = '2017/10/9';

const demo = html`
    <!-- Mailbox -->
    <div id="mailbox">
        <div class="flag">
            <div class="staff"></div>
            <div class="fly"></div>
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