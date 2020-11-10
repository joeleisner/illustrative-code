// JS cookie library
import Cookies from 'js-cookie';

// Toggle's a given tab's activation state
function toggleTabActivation(tab, force = true) {
    // Toggle the given tab's parent element's active class
    tab.parentElement.classList.toggle('active', force);
}

// Toggle's a section's visibility
function toggleSectionVisibility(section, state = true) {
    // Toggle the section's aria-hidden attribute
    section.setAttribute('aria-hidden', String(!state));
}

// Initialize the tabs functionality
function initialize() {
    // Grab all tabs...
    const tabs = Array.from(document.querySelectorAll('[data-target]'));
    // ... and if none exist, do nothing
    if (!tabs) return;

    // Next, get this page's tabs cookie,...
    const cookie = Cookies.get('tabs');
    // ... and the location path
    const path = window.location.pathname;

    // Show a specifc section
    function showSection(event) {
        // Prevent the default event
        event.preventDefault();

        // For each tab,...
        tabs.map(tab => {
            // Grab the ID of the section to be shown...
            const { target: id } = tab.dataset;
            // ... and store whether this tab is the one which caused the click event
            const active = tab === this;

            // Toggle the tab's activation state
            toggleTabActivation(tab, active);

            // Next, grab the tab's corresponding section...
            const section = document.getElementById(id);
            // ... and toggle its visibility
            toggleSectionVisibility(section, active);

            // If this tab isn't active, do nothing else
            if (!active) return;

            // Otherwise, set a cookie for the currently selected tab
            Cookies.set('tabs', id, { path })
        });
    }

    // For each tab,...
    tabs.forEach(tab => {
        // ... show its corresponding section when clicked
        tab.addEventListener('click', showSection);
    });

    // If there isn't a cookie set for this page, do nothing else
    if (!cookie) return;

    // Otherwise, find the tab associated with the saved cookie...
    const tab = document.querySelector(`[data-target="${ cookie }"]`);
    // ... and click it
    tab.click();
}

// When the DOM has loaded, initialize the tabs functionality
document.addEventListener('DOMContentLoaded', initialize);
