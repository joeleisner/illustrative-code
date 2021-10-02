import { html, Project } from '../../../../shared/html.js';
import info from './readme.md';

const title = 'Palindrome Loader';

const description = 'This example was made for day 6 of the Oct. 2017 Creative Sprint. The prompt was to use palindromes as your inspiration, so I decided to make a simple loader animation with a palindromic wave.';

const date = '2017/10/6';

const demo = html`
    <!-- Loader -->
    <div id="loader">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
    </div>
`;

export default Project({
    title,
    description,
    date,
    demo,
    info
});