    window.dataLayer = window.dataLayer || [];

    function handleSocialClick(event) {
        // Dynamically get the URL of the clicked social button
        var linkUrl = event.currentTarget.href || 'unknown';

        // Determine the event_section based on the custom data-section attribute
        var eventSection = this.getAttribute('data-section') || 'body';

        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'social_click',
            event_section: eventSection,
            link_url: linkUrl
        });

        // Log the interaction
        console.log("Social click interaction pushed");
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
                    // Attach the data-section attribute to each social button if not already present
                    if (!button.hasAttribute('data-section')) {
                        button.setAttribute('data-section', socialParent.getAttribute('data-section') || 'body');
                    }

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
