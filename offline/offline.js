// Get any cached projects
async function getCachedProjects() {
    // Attempt to get the runtime cache name...
    const cacheName = (await window.caches.keys()).find(name => name.includes('runtime'));
    // ... and if doesn't exist, do nothing else
    if (!cacheName) return [];

    // Attempt to grab the runtime cache...
    const cache = await window.caches.open(cacheName);
    // ... and if doesn't exist, do nothing else
    if (!cache) return [];

    // Get the runtime cache requests
    const requests = await cache.keys();

    // Get the project pages from the requests...
    const projects = requests.filter(request => {
        return request.url.includes('projects') &&
            !request.url.endsWith('css') &&
            !request.url.endsWith('js');
    });
    // ... and return the first 5
    return projects.slice(0, 6);
}

// Get a cached project's data
async function getProjectData(project) {
    // Get the project's URL
    const { url } = project;

    // Next, fetch the URL,...
    const response = await fetch(url);
    // ... grab its text data,...
    const data = await response.text();
    // ... and from its HTML...
    const html = document
        .createRange()
        .createContextualFragment(data);
    // ... grab the project's title
    const title = html
        .querySelector('title')
        .textContent.split(',')[0].trim();

    // Finally, return the title/url as an object
    return {
        title,
        url
    };
}

// Generate a list of project links
function generateProjectsList(projects) {
    // Create a list
    const list = document.createElement('ul');

    // For each project,...
    projects.forEach(({ title, url }) => {
        // Create an item...
        const item = document.createElement('li');
        // ... and a link
        const link = document.createElement('a');
        
        // Set the link's href to the project URL...
        link.href = url;
        // ... and its text to the project title
        link.textContent = title;

        // Append the link to the item...
        item.appendChild(link);
        // ... and append the item to the list
        list.appendChild(item);
    });

    // Finally, return the list
    return list;
}

// Initialize all functionality
async function initialize() {
    document.removeEventListener('DOMContentLoaded', initialize);

    // Attempt to get any cached projects...
    const projects = await getCachedProjects();
    // ... and if none exist, do nothing else
    if (!projects.length) return;

    // Next, grab the offline panel,...
    const offline = document.getElementById('offline');
    // ... its container,...
    const container = offline.querySelector('.panel__container');
    // ... and its only paragraph
    const description = container.querySelector('p');

    // Add additional text to the paragraph
    description.textContent += ' However, try one of these cached pages:';

    // Next, get the data from the cached projects
    const data = await Promise.all(projects.map(getProjectData));

    // Finally, generate a list of project links
    container.appendChild(generateProjectsList(data));
}

// When the DOM is loaded, initialize all functionality
document.addEventListener('DOMContentLoaded', initialize);