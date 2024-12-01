    window.dataLayer = window.dataLayer || [];

    function handleNavItemClick(event) {
        // Dynamically get the text of the specifically clicked item
        var clickText = event.target.innerText.trim();

        // Find the closest element with 'data-section' attribute, default to 'body' if not found
        var sectionElement = event.currentTarget.closest('[data-section]');
        var eventSection = sectionElement ? sectionElement.getAttribute('data-section') : 'body';

        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'navigation_interaction',
            click_text: clickText,
            interaction_type: 'link_click',
            event_section: eventSection
        });

        // Log the interaction
        console.log("Successful: Navigation item click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find all menu elements using the custom data attribute
        var menuElements = document.querySelectorAll('[data-attribute="link_click"]');

        if (menuElements.length > 0) {
            // Log that we've found the menu elements
            console.log("Successful: Menu elements with data-attribute found");

            menuElements.forEach(menuElement => {
                // Attach event listener to each child (menu item) of the menu
                var menuItems = menuElement.querySelectorAll('a'); // Assuming each menu item is an anchor tag
                menuItems.forEach(item => {
                    item.addEventListener('click', handleNavItemClick);
                });
            });

            // Log attaching the event listeners to menu items
            console.log("Successful: Click event listeners attached to menu items");
        } else {
            // Log if the menu elements are not found
            console.log("Failed: Menu elements with data-attribute not found");
        }
    });