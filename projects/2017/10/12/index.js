import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Lego Head';

const description = 'This example was made for day 12 of the Oct. 2017 Creative Sprint. The prompt was to make something inspired by a favorite childhood toy. I built a Lego figure’s head.';

const date = '2017/10/12';

const demo = html`
    <!-- Head -->
    <div id="head">
        <div class="stud"></div>
        <div class="face">
            <div class="eyes">
                <div class="eye"></div>
                <div class="eye"></div>
            </div>
            <div class="smile">
                <div class="mask"></div>
            </div>
        </div>
        <div class="neck"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});