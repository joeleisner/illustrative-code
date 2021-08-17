// Returns whether an element is within the viewport or not
function elementIsInViewport(element) {
    // Get the bounding client rect of element...
    var rect = element.getBoundingClientRect();
    // ... and return whether it's within the viewport or not
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

// Load image function
function lazyLoadElementImage(element) {
    // Grab the element's internal wrapper...
    const wrap = element.querySelector('.wrap');
    // ... and image
    const image = element.querySelector('img');

    // If the internal wrapper or image do exist, do nothing
    if (!wrap || !image) return;

    // Next, grab the proper source from the element's dataset...
    const { src } = image.dataset;
    // ... and create a new lazy image
    const lazyImage = new Image;

    // Remove the image's loading class
    image.classList.remove('loading');

    // If no proper source was defined in the element's dataset, do nothing else
    if (!src) return;

    // When the lazy image loads,...
    lazyImage.onload = function() {
        // ... set the actual image's source to that of the lazy image,...
        image.src = this.src;
        // ... remove the data-src attribute from the actual image,...
        image.removeAttribute('data-src');
        // ... and remove the wrapper's loading class
        wrap.classList.remove('loading');
    };

    // Set the lazy image's source to that of the actual image's proper source
    lazyImage.src = src;
}

// Lazy loads an element's image if within the viewport
function lazyLoadElementImageIfInViewport(element) {
    if (elementIsInViewport(element)) return lazyLoadElementImage(element);
}

// Lazy load card images when within the viewport
function lazyLoadCardImages() {
    // Grab the wrapper...
    const wrapper = document.getElementById('wrapper');
    // ... and all cards
    const cards = Array.from(document.querySelectorAll('.card'));

    // If no wrapper or cards exist, do nothing
    if (!wrapper || !cards.length) return;

    // Process card images
    function processCardImages() {
        cards.map(lazyLoadElementImageIfInViewport);
    }

    // Process each card's image when initialized...
    processCardImages();
    // ... and whenever the window is scrolled thereafter
    wrapper.addEventListener('scroll', processCardImages);
}

// Toggles the shadow class on a given element
function toggleShadowClass() {
    // Give the element the shadow class if the scroll position isn't at the top
    this.className = wrapper.scrollTop ? 'shadow' : '';
}

// Toggles the nav's drop-shadow based on the scroll position
function toggleNavShadow() {
    // Grab the nav...
    const nav = document.getElementById('nav');
    // ... and wrapper element
    const wrapper = document.getElementById('wrapper');

    // If the nav or wrapper do not exist, do nothing
    if (!nav || !wrapper) return;

    // Finally, toggle the nav's shadow class based on the wrapper scroll position
    wrapper.addEventListener('scroll', toggleShadowClass.bind(nav));
}

// Initialize the homaepgae functionality
function initialize() {
    lazyLoadCardImages();
    toggleNavShadow();
}

// When the DOM is loaded, initialize all JS
document.addEventListener('DOMContentLoaded', initialize);
