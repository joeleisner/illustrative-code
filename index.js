import { html, Home } from './shared/html.js';
import { Grid, ItemFull } from './components/grid/html.js';
import { Logo } from './components/logo/html.js';
import { title } from './config.js';
import description from './description.md';
import { Card } from './components/card/html.js';

const projects = [
    {
        path: '2021/10/3',
        title: 'Black Cat'
    },
    {
        path: '2021/8/23',
        title: 'Gameboy Color'
    },
    {
        path: '2017/10/30',
        title: 'Creative Sprint Trophy'
    },
    {
        path: '2017/10/29',
        title: 'iPhone 7+ (Redo)'
    },
    {
        path: '2017/10/27',
        title: 'Ripple Loader'
    },
    {
        path: '2017/10/25',
        title: 'Key'
    },
    {
        path: '2017/10/24',
        title: 'Sushi'
    },
    {
        path: '2017/10/23',
        title: 'Mini Synthesizer'
    },
    {
        path: '2017/10/22',
        title: 'Ruby'
    },
    {
        path: '2017/10/21',
        title: 'Pint o\' Beer'
    },
    {
        path: '2017/10/18',
        title: 'iPhone 7+'
    },
    {
        path: '2017/10/16',
        title: 'Speech Bubble'
    },
    {
        path: '2017/10/12',
        title: 'Lego Head'
    },
    {
        path: '2017/10/11',
        title: 'Rainbow Loader'
    },
    {
        path: '2017/10/9',
        title: 'Mailbox'
    },
    {
        path: '2017/10/7',
        title: 'Composition II in Red, Blue, and Yellow'
    },
    {
        path: '2017/10/6',
        title: 'Palindrome Loader'
    },
    {
        path: '2017/10/4',
        title: 'Plastic Bag'
    },
    {
        path: '2017/10/2',
        title: 'Hammer & Anvil'
    }
];

export const content = Grid(
    ItemFull(Logo()),
    ItemFull(html`
        <h1 class="sr-only">${ title }</h1>
        ${ description }
    `),
    ...projects.map(Card)
);

export default Home({ content });