    window.dataLayer = window.dataLayer || [];

    function handleBackToTopClick() {
        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'button_click',
						click_text: 'back to top'
        });

        // Log the interaction
        console.log("Successful: Back to top button click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find the back to top button using the ID selector
        var backToTopButton = document.getElementById('ast-scroll-top');

        if (backToTopButton) {
            // Log that we've found the back to top button
            console.log("Successful: Back to top button found");

            // Attach event listener to the back to top button
            backToTopButton.addEventListener('click', handleBackToTopClick);

            // Log attaching the event listener
            console.log("Successful: Click event listener attached to back to top button");
        } else {
            // Log if the back to top button is not found
            console.log("Failed: Back to top button not found");
        }
    });