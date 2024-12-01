    window.dataLayer = window.dataLayer || [];

    function handleSocialClick(event) {
        // Dynamically get the URL of the clicked social button
        var linkUrl = event.currentTarget.href || 'unknown';

        // Determine the event_section based on the parent element's class
        var parentElement = this.closest('.header, .footer');
        var eventSection = parentElement ? (parentElement.classList.contains('header') ? 'header' : 'footer') : 'body';

        // Get the icon class from the <i> tag inside the clicked <a> element
        var iconElement = this.querySelector('i');
        var iconClass = iconElement ? iconElement.className : 'unknown';  // Fallback if no <i> tag is found
        var socialIcon = iconClass.split(' ').filter(function(cls) {
            return cls.startsWith('fa-') && cls !== 'fab';  // Filters to get only the 'fa-' class (e.g., 'fa-instagram')
        })[0]?.replace('fa-', '') || 'unknown';  // Extracts the icon name and removes 'fa-'

        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'social_click',
            event_section: eventSection,
            link_url: linkUrl,
            social_icon: socialIcon  // Push the icon name
        });

        // Log the interaction
        console.log("Successful: Social click interaction pushed with icon:", socialIcon);
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find all parent elements of social buttons using the custom data attribute
        var socialParents = document.querySelectorAll('[data-attribute="social_click"]');

        if (socialParents.length > 0) {
            // Log that we've found the social buttons parent elements
            console.log("Successful: Social buttons parent elements with data-attribute found");

            socialParents.forEach(socialParent => {
                var socialButtons = socialParent.querySelectorAll('a'); // Assuming each social button is an anchor tag
                socialButtons.forEach(button => {
                    // Attach event listener to each social button
                    button.addEventListener('click', handleSocialClick);

                    // Log attaching the event listener
                    console.log("Successful: Click event listener attached to social button");
                });
            });
        } else {
            // Log if the social buttons parent elements are not found
            console.log("Failed: Social buttons parent elements with data-attribute not found");
        }
    });