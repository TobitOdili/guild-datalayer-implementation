    window.dataLayer = window.dataLayer || [];

    function handleGalleryInteraction(event) {
        // Check if the clicked element is a tab
        if (event.target.classList.contains('elementor-gallery-title')) {
            handleTabClick(event);
        }
        // Check if the clicked element is an image or within an anchor tag
        else if (event.target.tagName === 'A' || event.target.closest('a')) {
            handleImageClick(event);
        }
    }

    function handleTabClick(event) {
        // Dynamically get the text of the clicked tab
        var clickText = event.target.innerText.trim();

        // Pushing data to dataLayer for tab click
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'tab_click',
            click_text: clickText
        });

        // Log the tab click interaction
        console.log("Successful: Tab click interaction pushed");
    }

    function handleImageClick(event) {
        // Find the closest anchor tag (to handle clicks on nested elements like IMG within A)
        var anchor = event.target.closest('a');

        // Get the URL of the image (from the href attribute of the anchor tag)
        var imageUrl = anchor.href;

        // Pushing data to dataLayer for image click
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'image_click',
            image_url: imageUrl
        });

        // Log the image click interaction
        console.log("Successful: Image click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        // Find the gallery element using the custom data attribute
        var galleryElement = document.querySelector('[data-attribute="gallery_click"]');

        if (galleryElement) {
            // Attach event listener to the gallery element
            galleryElement.addEventListener('click', handleGalleryInteraction);

            // Log attaching the event listener
            console.log("Successful: Event listener attached to gallery element");
        } else {
            // Log if the gallery element is not found
            console.log("Failed: Gallery element with data-attribute not found");
        }
    });