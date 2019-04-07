# Illustrative Code
The idea behind **illustrative code** is to teach the direct parallels between code and creativity while incentivizing the exploration into the world of front-end web development for designers. This project is 100% open-source, and anything found within this repo may be copied or remixed. This repo contains the source code to the illustrative code project page as well as its examples.

If anything withing this project inspires you to dive into your own piece of illustrative code, be sure to share it on [Twitter](https://twitter.com/hashtag/illustrativecode) and [Instagram](https://www.instagram.com/explore/tags/illustrativecode/) using the **#illustrativecode** hashtag.

## Prerequisites
To set this project up, make sure you have the following:
* Node.js 8.2 or higher
* NPM 5.2.X

This has been tested only on macOS Sierra / High Sierra, so functionality may vary.

### Installation
```shell
git clone https://github.com/joeleisner/illustrative-code.git
cd illustrative-code
npm i
```

### Development
```shell
# npm run * / npx gulp *
# *:exp = expanded, *:min = minified

# Build all assets
npm run build
npm run build:exp
npm run build:min
# Build all global assets
npm run build:global
npm run build:global:exp
npm run build:global:min
# Build all project assets
npm run build:projects
npm run build:projects:exp
npm run build:projects:min

# Build JS assets
npm run js
npm run js:exp
npm run js:min

# Build PUG (HTML) assets
npm run pug
# Build global PUG (HTML) assets
npm run pug:global
# Build project PUG (HTML) assets
npm run pug:projects

# Build SASS (CSS) assets
npm run sass
npm run sass:exp
npm run sass:min
# Build global SASS (CSS) assets
npm run sass:global
npm run sass:global:exp
npm run sass:global:min
# Build project SASS (CSS) assets
npm run sass:projects
npm run sass:projects:exp
npm run sass:projects:min

# Build assets while watching for changes
npm run watch
```

## Credits
**Joel Eisner**

* [Twitter](https://twitter.com/joeleisner)
* [Instagram](https://www.instagram.com/joeleisner/)
