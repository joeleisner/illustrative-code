// JS cookie library
import Cookies from 'js-cookie';

// Navigation functionality
export class Nav {
    constructor() {}

    // Gets the ID of the panel a nav control targets
    controls(control) {
        return control.getAttribute('aria-controls').substring(1);
    }

    // Store all nav references
    store() {
        // Attempt to grab the nav...
        const nav = document.querySelector('.nav');
        // ... and if it doesn't exist, do nothing else
        if (!nav) return;

        // Next, attempt to grab nav controls
        const controls = Array.from(nav.querySelectorAll('[aria-controls]'));

        // Next, get the panels the controls target
        const panels = (controls.length ? controls : []).map(control => {
            const id = this.controls(control);
            return document.getElementById(id);
        });

        // Finally, store all references
        this.references = {
            nav,
            controls,
            panels
        };
    }

    // Get a nav cookie
    getCookie() {
        // First, store the location path
        this.path = window.location.pathname;

        // Next, attempt to get this page's nav cookie,...
        const cookie = Cookies.get('nav');
        // ... and if none exists, do nothing else
        if (!cookie) return;

        // Finally, store the cookie
        this.cookie = cookie;
    }

    // Restore a panel to show
    restorePanel() {
        if (!this.cookie) return;

        const control = this.references.controls.find(control => this.controls(control) === this.cookie);

        if (!control) return;

        const panel = this.references.panels.find(({ id }) => id === this.controls(control));

        this.toggleControlsAndPanels({ control, panel });
    }

    // Save a nav cookie
    setCookie(id) {
        const { path } = this;
        Cookies.set('nav', id, { path });
    }

    // Sets a nav control to active/inactive
    setControlActive(control, force = true) {
        // Toggle the nav control's active class
        control.classList.toggle('nav__link--active', force);
    }

    // Shows/hides a specific panel
    setPanelShow(panel, state = true) {
        // Toggle the section's aria-hidden attribute
        panel.setAttribute('aria-hidden', String(!state));
    }

    // Show/hide panels
    toggleControlsAndPanels(event) {
        let targetControl;
        let targetPanel;

        switch (event.constructor.name) {
            case 'Object':
                targetControl = event.control;
                targetPanel = event.panel;
                break;
            case 'PointerEvent':
                targetControl = event.currentTarget;
                targetPanel = this.references.panels.find(({ id }) => id === this.controls(targetControl));
                event.preventDefault();
                this.setCookie(targetPanel.id);
        }

        this.references.controls.forEach(control => this.setControlActive(control, control === targetControl));
        this.references.panels.forEach(panel => this.setPanelShow(panel, panel === targetPanel));
    }

    // Bind to nav control clicks
    controlsOnClick() {
        // For each nav control,...
        this.references.controls.forEach(control => {
            // ... show its corresponding panel when clicked
            control.addEventListener('click', this.toggleControlsAndPanels.bind(this));
        });
    }

    toggleNavShadow() {
        this.references.nav.classList.toggle('nav--shadow', window.pageYOffset);
    }

    documentOnScroll() {
        if (this.references.nav.classList.contains('nav--shadowless')) return;
        document.addEventListener('scroll', this.toggleNavShadow.bind(this));
    }

    // Start the nav functionality
    start() {
        // First, attempt to store all nav references
        this.store();

        // Next, attempt to get a nav cookie
        this.getCookie();

        // Next, show a nav if a cookie has been found
        this.restorePanel();

        // Finally, bind to all nav control clicks...
        this.controlsOnClick();
        // ... and document scrolling
        this.documentOnScroll();
    }
}