// Card functionality
export class Card {
    constructor() {
        this.references = [];
        this.lazyLoad = this.lazyLoad.bind(this);
    }

    // Store all card references
    store() {
        // Attempt to grab the cards...
        const cards = Array.from(document.querySelectorAll('.card'));
        // ... and if none exist, do nothing else
        if (!cards) return;

        this.references = cards.map(card => {
            const wrap = card.querySelector('.card__wrap');
            const image = card.querySelector('.card__image');

            return {
                card,
                wrap,
                image
            };
        });
    }

    // Returns whether a card is within the viewport or not
    visible({ card }) {
        return card.offsetTop < (window.innerHeight + window.pageYOffset);
    }

    // Lazy loads a card's image
    lazyLoadImage({ wrap, image }) {
        // If the card has already been loaded, do nothing else
        if (!wrap.classList.contains('card__wrap--loading') && !image.classList.contains('card__image--loading')) return;

        // Next, grab the proper source from the image's dataset...
        const { src } = image.dataset;
        // ... and create a new lazy image
        const lazyImage = new Image;

        // Remove the image's loading class
        image.classList.remove('card__image--loading');

        // If no proper source was defined in the element's dataset, do nothing else
        if (!src) return;

        // If no proper source was defined in the element's dataset, do nothing else
        if (!src) return;

        // When the lazy image loads,...
        lazyImage.onload = function() {
            // ... set the actual image's source to that of the lazy image,...
            image.src = this.src;
            // ... remove the data-src attribute from the actual image,...
            image.removeAttribute('data-src');
            // ... and remove the wrapper's loading class
            wrap.classList.remove('card__wrap--loading');
        };

        // Set the lazy image's source to that of the actual image's proper source
        lazyImage.src = src;
    }

    // Lazy loads all cards
    lazyLoad() {
        // If an active timeout exists, clear it out
        if (this.timeout) clearTimeout(this.timeout);

        // If no more references are left, stop lazy loading the cards when the screen changes
        if (!this.references.length) this.lazyLoadOnViewportChange(false);

        // After 20 milliseconds,...
        this.timeout = setTimeout(() => {
            // ... for each card,...
            this.references.forEach((card, index) => {
                // ... if it's not visible, do nothing else,...
                if (!this.visible(card)) return;

                // ... otherwise, lazy load its image...
                this.lazyLoadImage(card);
                // ... and delete its reference
                delete this.references[index];
            });

            // Finally, update the references to remove any deleted cards
            this.references = this.references.filter(Boolean);
        }, 20);
    }

    // Lazy load the cards when the screen changes (scrolled, resized, rotated)
    lazyLoadOnViewportChange(run = true) {
        const listener = `${ run ? 'add' : 'remove' }EventListener`;
        document[listener]('scroll', this.lazyLoad);
        window[listener]('resize', this.lazyLoad);
        window[listener]('orientationchange', this.lazyLoad);
    }

    // Start the card functionality
    start() {
        // First attempt to store all card references...
        this.store();
        // ... and if none were stores, do nothing else
        if (!this.references.length) return;

        // Finally, lazy load all cards now...
        this.lazyLoad();
        // ... and when the screen is scrolled, resized, or rotated
        this.lazyLoadOnViewportChange();
    }
}