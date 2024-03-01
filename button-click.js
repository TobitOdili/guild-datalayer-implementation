window.dataLayer = window.dataLayer || [];

function handleButtonClick(event) {
    // Dynamically get the text of the clicked button
    var clickText = event.currentTarget.innerText.trim();

    // Pushing data to dataLayer
    window.dataLayer.push({
        event: 'content_interaction',
        interaction_type: 'button_click',
        click_text: clickText
    });

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
