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

        // Next, get the theme toggle
        const toggle = document.getElementById('nav__toggle');

        // Finally, store all references
        this.references = {
            nav,
            controls,
            panels,
            toggle
        };
    }

    // Get a user theme
    getUserTheme() {
        console.log('Get user theme!');
        // Attempt to get a saved user theme...
        const cookie = Cookies.get('theme');
        // ... and if none are found, store it as the system theme
        if (!cookie) return this.theme.user = this.theme.system;

        // Otherwise, store the saved user theme
        this.theme.user = cookie;
    }

    // Set a user theme
    setUserTheme(theme) {
        console.log('Set user theme!');
        // Add the theme to the document element's theme data,...
        document.documentElement.setAttribute('data-theme', theme);
         // ... set a cookie expiration date of 1 year,..
        const expires = 365;
        // ... and store the user theme as a cookie
        Cookies.set('theme', theme, { expires });
    }

    // Remove a user theme
    removeUserTheme() {
        console.log('Remove user theme!');
        // Remove the document element's theme data...
        document.documentElement.removeAttribute('data-theme');
        // ... and remove any theme override cookies
        Cookies.remove('theme');
    }

    // Update the theme toggle
    updateThemeToggle() {
        // Generate a title to use
        const title = `Toggle on ${ this.theme.user === 'light' ? 'dark' : 'light' } mode`;
        // Set the toggle's title,...
        this.references.toggle.title = title;
        // ... aria-label,...
        this.references.toggle.setAttribute('aria-label', title);
        // ... icon,...
        this.references.toggle.dataset.icon = this.theme.user === 'light' ? '\uf186' : '\uf185';
        // ... and text that is opposite of the current user theme
        this.references.toggle.querySelector('.nav__text').textContent = `${ this.theme.user === 'light' ? 'Dark' : 'Light' } mode`;
    }

    // Change the user theme
    changeTheme(forced) {
        // Get the stored user theme
        const { user } = this.theme;

        // Generate the user theme
        const theme = forced
            ? forced
            : user === 'light'
            ? 'dark'
            : 'light';
        // ... and store it
        this.theme.user = theme;

        // Next, update the theme toggle
        this.updateThemeToggle();

        // Finally, either remove or set the user theme
        return this.theme.system === this.theme.user
            ? this.removeUserTheme()
            : this.setUserTheme(theme);
    }

    // Setup site theming
    setupTheme() {
        if (!this.references.toggle) return;

        this.theme = {};

        const { matches: systemDarkMode } = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );

        this.theme.system = systemDarkMode ? 'dark' : 'light';
        this.getUserTheme();

        console.log(this.theme);

        this.changeTheme(this.theme.user);

        this.references.toggle.addEventListener('click', () => this.changeTheme.bind(this)());
    }

    // Get the nav state stored as a cookie
    getNavState() {
        // First, store the location path
        this.path = window.location.pathname;

        // Next, attempt to get this page's nav cookie,...
        const cookie = Cookies.get('nav--state');
        // ... and if none exists, do nothing else
        if (!cookie) return;

        // Finally, store the cookie
        this.state = cookie;
    }

    // Restore a panel to show
    restorePanel() {
        if (!this.state) return;

        const control = this.references.controls.find(control => this.controls(control) === this.state);

        if (!control) return;

        const panel = this.references.panels.find(({ id }) => id === this.controls(control));

        this.toggleControlsAndPanels({ control, panel });
    }

    // Save the nav state as a cookie
    setNavState(id) {
        const { path } = this;
        Cookies.set('nav--state', id, { path });
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
                this.setNavState(targetPanel.id);
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

        // Next, setup site theming
        this.setupTheme();

        // Next, attempt to get a saved nav state...
        this.getNavState();
        // ... and restore a panel's visibility if found
        this.restorePanel();

        // Finally, bind to all nav control clicks...
        this.controlsOnClick();
        // ... and document scrolling
        this.documentOnScroll();
    }
}