    window.dataLayer = window.dataLayer || [];

    function handleTagClick(event) {
        // Dynamically get the text of the clicked tag
        var clickText = event.target.innerText.trim();

        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'tag_click',
            click_text: clickText
        });

        // Log the interaction
        console.log("Successful: Tag click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find all elements with the data-attribute="tag_click"
        var tagElements = document.querySelectorAll('[data-attribute="tag_click"]');

        if (tagElements.length > 0) {
            // Log that we've found the tag elements
            console.log("Successful: Tag elements with data-attribute found");

            tagElements.forEach(tagElement => {
                // Attach event listener to each tag element
                tagElement.addEventListener('click', handleTagClick);

                // Log attaching the event listener
                console.log("Successful: Click event listener attached to tag element");
            });
        } else {
            // Log if the tag elements are not found
            console.log("Failed: Tag elements with data-attribute not found");
        }
    });