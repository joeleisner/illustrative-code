// Add image lazy-loading to cards
function cards() {
    // Select all cards
    let wrapper = document.getElementById('wrapper'),
        cards =   document.querySelectorAll('.card'),
        i;
    // Element is in viewport function
    function elementIsInViewport(element) {
        // Get the bounding client rect of element
        var rect = element.getBoundingClientRect();
        // Return true if the element is within the viewport, and false if it is not
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
    // Process cards
    function processCards() {
        // For each card...
        for (i = 0; i < cards.length; i++) {
            let card = cards[i];
            // ..., if it's within the viewport, ...
            if (elementIsInViewport(card)) {
                // ... load its image
                loadImage(card);
            }
        }
    }
    // Load image function
    function loadImage(card) {
        // Get the data-src attribute of the card's image and create a new, virtual image
        let wrap =      card.querySelector('.wrap'),
            image =     card.getElementsByTagName('img')[0],
            dataSrc =   image.getAttribute('data-src'),
            lazyImage = new Image();
        image.classList.remove('loading');
        // If there's no data-src attribute on the card's image, it's been loaded
        if (!dataSrc) return;
        // When the virtual image loades...
        lazyImage.onload = function() {
            // ... set the passed image's source to the virtual image's source,...
            image.src = this.src;
            // ... remove the data-src attribute from the image,...
            image.removeAttribute('data-src');
            // ... and add a "loaded" class to the card
            wrap.classList.remove('loading');
        };
        // Set the virtual image's source to the passed image's data-src
        lazyImage.src = dataSrc;
    }
    // Process the cards when initialized...
    processCards();
    // ... and when the window is scrolled
    wrapper.addEventListener('scroll', processCards);
}

function navShadow() {
    let nav = document.getElementById('nav'),
        wrapper = document.getElementById('wrapper');

    function addShadow() {
        nav.className = wrapper.scrollTop ? 'shadow' : '';
    }

    wrapper.addEventListener('scroll', addShadow);
}

// Initialize the contained functions
function initialize() {
    cards();
    navShadow();
}

// When the DOM is loaded, initialize all JS
document.addEventListener('DOMContentLoaded', initialize);
