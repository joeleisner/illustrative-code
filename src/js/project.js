import Cookies from 'js-cookie';

// Open sections using tabs
function tabs() {
    // Select all tabs, set what tab is visible, and grab any available cookies as well as the window location
    let tabs =    document.querySelectorAll('[data-tab-toggle]'),
        visible = 'demo',
        cookie =  Cookies.get('tabs'),
        path =    window.location.pathname,
        i;
    // Actibate the tab
    function activateTab(tab) {
        // Grab the tab's parent element...
        let parent = tab.parentElement;
        // ... and set its class to active
        parent.className = 'active';
    }
    // Deactive tabs except the one passed as an argument
    function deactivateTabs(exception) {
        let j;
        // For each tab...
        for (j = 0; j < tabs.length; j++) {
            let tab = tabs[j];
            // If the current tab is the one to ignore, continue through the loop
            if (tab === exception) continue;
            // Select the tab's parent element...
            let parent = tab.parentElement;
            // ... and remove its class attribute
            parent.removeAttribute('class');
        }
    }
    // Hide sections except the one passed as an argument
    function hideSections(exception) {
        // Select all sections
        let sections = document.querySelectorAll('section'),
            k;
        // For each section...
        for (k = 0; k < sections.length; k++) {
            let section = sections[k];
            // If the current section is the one to ignore, continue through the loop
            if (section === exception) continue;
            // Update the section's class...
            section.className = 'hidden';
            // ... and aria-hidden attribute
            section.setAttribute('aria-hidden', 'true');
        }
    }
    // Show a specifc section
    function showSection(event) {
        // Prevent the default event
        event.preventDefault();
        // Grab the ID of the section to be shown
        let id = this.getAttribute('data-tab-toggle');
        // If the section about to be shown is already visible
        if (visible === id) return;
        // Signify that the section with this ID is now visible
        visible = id;
        // Activate this tab...
        activateTab(this);
        // ... and deactivate all other tabs
        deactivateTabs(this);
        // Grab the section with that ID
        let section = document.getElementById(id);
        // Update the section's class...
        section.className = 'visible';
        // ... and aria-hidden attribute
        section.setAttribute('aria-hidden', 'false');
        // Hide all sections except the one just made visible
        hideSections(section);
        // Set a cookie for the currently selected tab
        Cookies.set('tabs', visible, { path })
    }
    // For each tab...
    for (i = 0; i < tabs.length; i++) {
        let tab = tabs[i];
        // ... show a section when clicked
        tab.addEventListener('click', showSection);
    }
    // If a cookie is set for this page...
    if (cookie) {
        // Find the tab associated with the saved cookie...
        let tab = document.querySelector(`[data-tab-toggle="${ cookie }"]`);
        // ... and click it
        tab.click();
    }
}

// When the DOM has loaded, initialize the tabs functionality
document.addEventListener('DOMContentLoaded', tabs);
