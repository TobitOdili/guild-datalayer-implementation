document.addEventListener('DOMContentLoaded', function() {
    window.dataLayer = window.dataLayer || [];

    // Function to handle cart click event
    function handleCartClick() {
        // Delaying the check to allow for the class change
        setTimeout(function() {
            var parentDiv = document.querySelector('div.elementor-menu-cart--shown'); // Adjust the selector to target the specific parent div
            var interactionType = 'cart_click';
            var clickText = parentDiv ? 'Open Cart' : 'Close Cart';

            // Pushing data to dataLayer
            window.dataLayer.push({
                event: 'content_interaction',
                interaction_type: interactionType,
                click_text: clickText
            });

            // Log the interaction
            console.log(`Successful: ${clickText} interaction pushed`);
        }, 100); // Adjust the delay if necessary to ensure it captures the state change
    }

    // Find all elements with the data-attribute="cart_click"
    var cartElements = document.querySelectorAll('[data-attribute="cart_click"]');

    if (cartElements.length > 0) {
        // Log that we've found the cart elements
        console.log("Successful: Cart elements with data-attribute found");

        cartElements.forEach(function(cartElement) {
            // Attach event listener to each cart element
            cartElement.addEventListener('click', handleCartClick);

            // Log attaching the event listener
            console.log("Successful: Click event listener attached to cart element");
        });
    } else {
        // Log if the cart elements are not found
        console.log("Failed: Cart elements with data-attribute not found");
    }
});