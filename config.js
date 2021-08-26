// The title of the site
export const title = 'Illustrative Code';

// The description of the site
export const description = 'The idea behind illustrative code is to teach the direct parallels between code and creativity while incentivizing the exploration into the world of front-end web development for designers.';

// The root directory of the site
export const root = '/illustrative-code/';

// The URL of the site
export const url = 'http://joeleisner.com/illustrative-code/';

// The site's theme color
export const color = '#333';

// The build directory of the site
export const build_dir = 'build';

// Icon information
export const icon_type = 'png';
export const icons = {
    src: 'images/icon.png',
    type: icon_type,
    variants: [
        32,
        48,
        72,
        96,
        144,
        192,
        256,
        384,
        512
    ].map((size, index) => {
        const dir = index ? 'icons/' : undefined;
        const name = `icon-${ size }.${ icon_type }`;
        return {
            dir,
            name,
            size,
        };
    }),
    dest: build_dir + '/icons'
};

// The web manifest information
export const manifest = {
    name: title,
    short_name: 'IC',
    description: description,
    start_url: root,
    background_color: color,
    theme_color: color,
    display: 'minimal-ui',
    lang: 'en-US',
    orientation: 'portrait',
    icons: icons.variants.slice(1).map(({ dir, name, size }) => {
        const src = dir + name;
        const sizes = `${ size }x${ size }`;
        const type = 'image/' + icon_type;
        return {
            src,
            sizes,
            type
        };
    })
};

// Author information
export const author = {
    name: 'Joel Eisner',
    twitter: '@joeleisner'
};
