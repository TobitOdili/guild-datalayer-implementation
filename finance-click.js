    const applyButton = document.getElementById("myButtonLink");
    applyButton.addEventListener("click", applyButtonClick);

    function applyButtonClick() {
        const storeLocation = document.querySelector(".selected").textContent.trim();

        if (storeLocation !== "") {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'content_interaction',
                interaction_type: 'button_click',
                store_location: storeLocation, // Corrected parameter name
                click_text: 'apply now' // Added click_text parameter
            });

            console.log("Successful: Apply Now Button Click Data Layer Push - Store Location:", storeLocation);
        }
    }