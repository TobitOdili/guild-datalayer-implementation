    window.dataLayer = window.dataLayer || [];

 function handleButtonClick(event) {
    // Dynamically get the text of the clicked button
   var clickText = event.currentTarget.innerText.trim();

// Check if the clicked button's ID is 'downloadBtn'
    if (event.currentTarget.id === 'downloadBtn') {
        // Override clickText to 'download brochure'
        clickText = 'Download Brochure';
    }
    
        // Find the nearest section element with data-section attribute
        var sectionElement = event.currentTarget.closest('[data-section]');
        var eventSection = sectionElement ? sectionElement.getAttribute('data-section') : 'body';

        // Default interaction type
        var interactionType = 'button_click';

        // Check if the clicked button or its parent has 'store_location' class
        var storeLocationElement = event.currentTarget.closest('.store_location');

        var dataLayerObject = {
            event: 'content_interaction',
            interaction_type: interactionType,
            click_text: clickText,
            event_section: eventSection // Default event_section value
        };

        // Replace 'event_section' with 'store_location' if condition is met
        if (storeLocationElement) {
            dataLayerObject.store_location = eventSection;
            delete dataLayerObject.event_section; // Remove the event_section parameter
        }

        // Pushing data to dataLayer
        window.dataLayer.push(dataLayerObject);

        // Log the interaction
        console.log("Button click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find all button elements using the custom data attribute
        var buttonElements = document.querySelectorAll('[data-attribute="button_click"]');

        if (buttonElements.length > 0) {
            // Log that we've found the button elements
            console.log("Successful: Button elements with data-attribute found");

            buttonElements.forEach(buttonElement => {
                // Attach event listener to each button element
                buttonElement.addEventListener('click', handleButtonClick);
            });

            // Log attaching the event listeners to button elements
            console.log("Successful: Click event listeners attached to button elements");
        } else {
            // Log if the button elements are not found
            console.log("Failed: Button elements with data-attribute not found");
        }
    });