// Define standalone attributes
export const STANDALONE_ATTRIBUTES = ['defer'];

// Converts a key/pair object to a string of attributes
export function attributes(object) {
    // For each object key,...
    return Object.keys(object).map(key => {
        // Grab the key's corresponding value
        const value = object[key];

        // If the value is undefined, return the value
        if (value == undefined) return value;

        // If the value is boolean, true, and is a standalone attribute, return just the key
        if (typeof value === 'boolean' && value && STANDALONE_ATTRIBUTES.includes(key)) return key;

        // Otherwise, 
        return `${key}="${object[key]}"`;
    }).filter(Boolean).join(' ');
}

// Format a given value to an HTML-safe string
export function format(value) {
    // If the value is null/undefined, return an empty string
    if (value == undefined) return '';

    // Handle different value types
    switch(typeof value) {
        // If the value is a function,...
        case 'function':
            // ... return it executed
            return value();
        // If the value is a number,...
        case 'number':
            // ... return it as a string
            return String(value);
        // If the value is an object,...
        case 'object':
            // ... and an array,...
            return Array.isArray(value) ? 
                // ... return it formatted and joined,...
                value.map(format).join('\n') : 
                // ... otherwise, return it as an attributes string
                attributes(value);
        // Otherwise,...
        default:
            // ... return it as-is
            return value;
    }
}

// Convert HTML template literals into usable strings
export function html(strings, ...values) {
    // Reduce the strings down to a single string...
    return strings.reduce((output, string, index) => {
        // Grab the value at the current index...
        const value = values[index];
        // ... and add the string and it formatted to the output
        return output += string + format(value);
    }, '')
        // ... with empty lines removed...
        .replace(/^\s*$(?:\r\n?|\n)/gm, '')
        // ... and trimmed
        .trim();
}

// Converts a string to a slug (lowercase, dash-separated)
export function slug(string, separator = ' ') {
    return string.split(separator).map(piece => piece.toLowerCase()).join('-');
}

// Generates a metadata tag with the given attributes
export function Meta(attributes) {
    return html`
        <meta ${ attributes }>
    `;
}

// Generates a link tag with the given attributes
export function Link({ rel = 'stylesheet', ...attributes }) {
    return html`
        <link rel="${ rel }" ${ attributes }>
    `;
}

// Generates a Font Awesome icon tag with the given attributes
export function Icon({ style = 'solid', icon, text, ...attributes }) {
    const styles = {
        brand: 'fab',
        solid: 'fas'
    };

    const classes = [
        styles[style],
        `fa-${ icon }`,
        attributes.class
    ].filter(Boolean).join(' ');

    delete attributes.class;

    return html`
        <i class="${ classes }" ${ attributes }>
            ${ text ? html`<span class="sr-only">${ text }</span>` : '' }
        </i>
    `;
}

// Generates a script tag with the given attributes
export function Script({ src, ...attributes }) {
    return html`
        <script src="${ src }" ${ attributes }></script>
    `;
}

// Bootstraps a general HTML document
export function Document({
    title,
    meta = [],
    links = [],
    styles = [],
    body,
    scripts = []
}) {
    // Prepend necessary metadata to the provided metadata
    meta = [
        { charset: 'UTF-8' },
        {
            'http-equiv': 'x-ua-compatible',
            content: 'ie=edge'
        },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0'
        },
        ...meta
    ];

    // Append the styles to the links array
    if (styles.length) {
        links = [
            ...links,
            ...styles.map(style => ({ href: style, media: 'screen' }))
        ];
    }

    // Format the scripts array
    if (scripts.length) {
        scripts = scripts.map(script => ({ src: script, defer: true }));
    }

    return html`
        <!DOCTYPE html>
        <html lang='en'>
        <head>
            <!-- Title -->
            <title>${ title }</title>
            <!-- Metadata -->
            ${ meta.map(Meta) }
            <!-- Links -->
            ${ links.map(Link) }
        </head>
        <body>
            ${ body }
        </body>
        <!-- Scripts -->
        ${ scripts.map(Script) }
        </html>
    `;
}

// Config settings
import * as config from '../config.js';

// Generate the social meta tags
export function generateSocialMeta({ title, description, image, url, keywords }) {
    let output = [
        {
            property: 'og:type',
            content: 'website'
        },
        {
            name: 'twitter:card',
            content: 'summary'
        },
        {
            name: 'twitter:creator',
            content: config.author.twitter
        },
        {
            property: 'og:title',
            content: title
        },
        {
            property: 'twitter:title',
            content: title
        },
        {
            name: 'theme-color',
            content: config.color
        }
    ];

    if (description) {
        output.push(
            {
                name: 'description',
                content: description
            },
            {
                property: 'og:description',
                content: description
            },
            {
                name: 'twitter:description',
                content: description
            }
        );
    }

    if (image) {
        output.push(
            {
                property: 'og:image',
                content: image
            },
            {
                name: 'twitter:image',
                content: image
            }
        );
    }

    if (url) {
        output.push({
            property: 'og:url',
            content: url
        });
    }

    if (keywords.length) {
        output.push({
            name: 'keywords',
            content: keywords.join(', ')
        });
    }

    return output;
}

// Generate the icon link tags
export function generateIconLinks() {
    return [
        {
            rel: 'icon',
            href: config.root + config.manifest.icons[0].src,
            sizes: 'any'
        },
        {
            rel: 'icon',
            href: config.root + config.icons.favicon.path,
            type: 'image/svg+xml'
        },
        ...config.manifest.icons.map(icon => {
            return {
                rel: 'apple-touch-icon',
                size: icon.sizes,
                href: config.root + icon.src
            };
        })
    ];
}

// Render the nav component
import { Nav } from '../components/nav/html.js';

// Render the wrapper component
import { Wrapper } from '../components/wrapper/html.js';

// Bootstraps the site's base layout
export function Base({
    title,
    description,
    image,
    url,
    keywords = [],
    styles = [],
    nav = [],
    navShadow = true,
    main,
    footer,
    scripts = []
}) {
    // Add the social meta tags
    const meta = generateSocialMeta({ title, description, image, url, keywords });

    // Add the icon and manifest links
    const links = [
        ...generateIconLinks(),
        {
            rel: 'manifest',
            href: config.root + 'manifest.webmanifest',
            crossorigin: 'anonymous'
        }
    ];

    // Add the site styles
    styles = [
        config.root + 'site.css',
        ...styles
    ];

    // Define the body
    const body = [
        Nav({ links: nav, shadow: navShadow }),
        Wrapper(
            html`
                <main>
                    ${ main }
                </main>
                ${ footer }
            `
        )
    ];

    // Add the site script
    scripts = [
        config.root + 'site.js',
        ...scripts
    ];

    // Finally, render the document
    return Document({
        title,
        meta,
        links,
        styles,
        body,
        scripts
    });
}

// Homepage icons
import homeIcon from '@fortawesome/fontawesome-free/svgs/solid/home.svg';
import twitterIcon from '@fortawesome/fontawesome-free/svgs/brands/twitter.svg';
import instagramIcon from '@fortawesome/fontawesome-free/svgs/brands/instagram.svg';
import codeBranchIcon from '@fortawesome/fontawesome-free/svgs/solid/code-branch.svg';
import moonIcon from '@fortawesome/fontawesome-free/svgs/solid/moon.svg';
import sunIcon from '@fortawesome/fontawesome-free/svgs/solid/sun.svg';

// Theme toggle icons
export const themeToggleIcons = [ moonIcon, sunIcon ];

// Theme toggle
export const themeToggle = {
    type: 'button',
    id: 'nav__toggle',
    title: 'Turn on dark mode',
    icon: themeToggleIcons,
    text: 'Dark mode'
};

// Footer component
import { Footer } from '../components/footer/html.js';

// Bootstraps the site's home layout
export function Home({
    content: main
}) {
    // Grab the title/description from the config
    const {
        title,
        description
    } = config;

    // Define the image,...
    const image = config.url + 'images/thumbnail.png';
    // ... nav structure,...
    const nav = [
        {
            to: 'http://joeleisner.com',
            title: 'Joel Eisner\'s homepage',
            icon: homeIcon,
            text: 'Home'
        },
        {
            to: 'https://twitter.com/joeleisner',
            title: 'Joel Eisner\'s Twitter',
            icon: twitterIcon,
            text: 'Twitter'
        },
        {
            to: 'https://instagram.com/joeleisner',
            title: 'Joel Eisner\'s Instagram',
            icon: instagramIcon,
            text: 'Instagram'
        },
        {
            to: 'https://github.com/joeleisner/illustrative-code/',
            title: 'Illustrative Code Github repo page',
            icon: codeBranchIcon,
            text: 'GitHub'
        },
        themeToggle
    ];
    // ... and footer
    const footer = Footer();

    // Finally, render the base layout
    return Base({
        title,
        description,
        image,
        nav,
        main,
        footer
    });
}

// Project page icons
import chevronLeftIcon from '@fortawesome/fontawesome-free/svgs/solid/chevron-left.svg';
import playIcon from '@fortawesome/fontawesome-free/svgs/solid/play.svg';
import alignJustifyIcon from '@fortawesome/fontawesome-free/svgs/solid/align-justify.svg';
import codeIcon from '@fortawesome/fontawesome-free/svgs/solid/code.svg';

// Panel component
import { Panel } from '../components/panel/html.js';

// Bootstraps the site's project layout
export function Project({
    title,
    description,
    date,
    demo,
    info,
    script = false
}) {
    // Define the title,...
    title += ', an Illustrative Code example';
    // ... description,...
    description = description || config.description;
    // ... and image
    const image = `${ config.url }images/${ slug(date, '/') }.jpg`;

    // Add the project styles
    const styles = [
        'project.css'
    ];

    // Define the nav
    const nav = [
        {
            to: config.root,
            title: 'Back to the Illustrative Code homepage',
            icon: chevronLeftIcon,
            text: 'Back'
        },
        {
            type: 'button',
            to: 'demo',
            title: 'Project demo',
            icon: playIcon,
            text: 'Demo',
            active: true
        },
        {
            type: 'button',
            to: 'description',
            title: 'Project description',
            icon: alignJustifyIcon,
            text: 'Description'
        },
        {
            to: 'https://github.com/joeleisner/illustrative-code/tree/main/projects/' + date,
            title: 'Project source code on Github',
            icon: codeIcon,
            text: 'Code'
        },
        themeToggle
    ];

    const navShadow = false;

    // Define the main content
    const main = [
        Panel({
            id: 'demo',
            label: 'Demo',
            visible: true,
            children: [demo]
        }),
        Panel({
            id: 'description',
            label: 'Description',
            contain: true,
            children: [info]
        })
    ];

    // Add the project script
    let scripts = [];
    if (script) scripts.push('project.js');

    // Finally, render the base layout
    return Base({
        title,
        description,
        image,
        styles,
        nav,
        navShadow,
        main,
        scripts
    });
}
