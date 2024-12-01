    window.dataLayer = window.dataLayer || [];

    function handleTabClick(event) {
        // Check if the clicked element is a tab
        var tab = event.target.closest('.e-filter-item');
        if (!tab) {
            return; // Exit if the clicked element is not a tab
        }

        // Get the text of the clicked tab
        var tabText = tab.innerText.trim();

        // Pushing data to dataLayer
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'tab_click',
            click_text: tabText
        });

        console.log("Successful: Tab click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        var filterBar = document.querySelector('[data-attribute="tab_click"]');
        if (filterBar) {
            console.log("Successful: Filter bar with data-attribute found");
            filterBar.addEventListener('click', handleTabClick);
        } else {
            console.log("Failed: Filter bar with data-attribute not found");
        }
    });