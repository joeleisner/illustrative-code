import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Mini Synthesizer';

const description = 'This example was made for day 23 of the Oct. 2017 Creative Sprint. The prompt was to make something inspired by a sound you heard that day. I decided on synthwave (80’s-sounding electronic) for that day\'s work-music, so I made a little mini synth (inspired by my M-Audio mini).';

const date = '2017/10/23';

const demo = html`
    <!-- Keyboard -->
    <div id="keyboard">
        <div class="controls">
            <div class="screen"></div>
            <div class="knobs">
                <div class="knob"></div>
                <div class="knob"></div>
            </div>
        </div>
        <div class="keys">
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
            <div class="key minor"></div>
            <div class="key"></div>
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