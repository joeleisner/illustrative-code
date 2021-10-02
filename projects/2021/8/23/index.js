import { html, slug, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Gameboy Color';

const description = 'A color-selectable Gameboy Color made with CSS, HTML, & JS.';

const date = '2021/8/23';

const buttons = [
    'Atomic Purple',
    'Indigo',
    'Berry',
    'Kiwi',
    'Dandelion',
    'Teal'
].map((color, index) => ({
    class: slug(color),
    title: color,
    'aria-label': color,
    'aria-pressed': !index
}));

const demo = html`
    <!-- Gameboy -->
    <div id="gameboy" class="atomic-purple">
        <div class="screen">
            <div class="power"></div>
            <div class="display"></div>
        </div>
        <div class="controls">
            <div class="d-pad">
                <div class="left-right"></div>
                <div class="up-down"></div>
            </div>
            <div class="b"></div>
            <div class="a"></div>
        </div>
        <div class="buttons">
            <div class="select"></div>
            <div class="start"></div>
        </div>
        <div class="speaker">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div>
        </div>
    </div>
    <!-- Color picker -->
    <div id="picker">
        ${ buttons.map(attributes => html`<button ${ attributes }></button>`) }
    </div>
`;

const script = true;

export default Project({
    title,
    description,
    date,
    demo,
    info,
    script
});