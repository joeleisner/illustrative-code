import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Sushi';

const description = 'This example was made for day 24 of the Oct. 2017 Creative Sprint. The prompt was to find inspiration today in a tradition of a culture other than your own for #UnitedNationsDay. I decided to make a little, minimalistic sushi to represent Japanese culture.';

const date = '2017/10/24';

const demo = html`
    <!-- Sushi -->
    <div id="sushi">
        <div class="rice">
            <div class="seaweed">
                <div class="filling">
                    <div class="avacado">
                        <div class="piece"></div>
                        <div class="piece"></div>
                    </div>
                    <div class="salmon"></div>
                </div>
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