window.dataLayer = window.dataLayer || [];

function handleLogoClick() {
    // Dynamically get the URL of the current page
    var currentUrl = window.location.href;

    // Determine the event_section based on the parent element's class
    var parentElement = this.closest('.header, .footer');
    var eventSection = parentElement ? (parentElement.classList.contains('header') ? 'header' : 'footer') : 'unknown';

    // Pushing data to dataLayer
    window.dataLayer.push({
        event: 'content_interaction',
        link_url: currentUrl,
        interaction_type: 'logo_click',
        event_section: eventSection
    });

    // Log the interaction
    console.log("Successful: Logo click interaction pushed");
}

document.addEventListener('DOMContentLoaded', function() {
    // Find all logo elements using the custom data attribute
    var logoElements = document.querySelectorAll('[data-attribute="logo_click"]');

    if (logoElements.length > 0) {
        // Log that we've found the logo elements
        console.log("Successful: Logo elements with data-attribute found");

        logoElements.forEach(logoElement => {
            // Attach event listener to each logo element
            logoElement.addEventListener('click', handleLogoClick);
        });

        // Log attaching the event listeners to logo elements
        console.log("Successful: Click event listeners attached to logo elements");
    } else {
        // Log if the logo elements are not found
        console.log("Failed: Logo elements with data-attribute not found");
    }
});
