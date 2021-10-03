import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'iPhone 7+ (Redo)';

const description = 'This example was made for day 29 of the Oct. 2017 Creative Sprint. The prompt was to ask someone whose opinion you respect to select something from my Creative Sprint work to revise or improve upon. I asked a bunch of people, and the most feedback I got was on my day 18 prompt. I decided to add more color, design, and overall vibrancy to my CSS/HTML matte-black iPhone 7+.';

const date = '2017/10/29';

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
            <div class="screen">
                <div class="folders">
                    <div class="row">
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                    </div>
                    <div class="row">
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                    </div>
                    <div class="row">
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                        <div class="icon folder"></div>
                    </div>
                </div>
                <div class="dock">
                    <div class="icon green"></div>
                    <div class="icon green"></div>
                    <div class="icon white"></div>
                    <div class="icon white"></div>
                </div>
            </div>
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