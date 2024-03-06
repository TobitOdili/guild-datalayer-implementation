document.addEventListener('DOMContentLoaded', function() {
    window.dataLayer = window.dataLayer || [];

    function trackFormSubmission(form, formType, formName) {
        setTimeout(function() {
            var interactionResponse = checkFormSubmissionResult();
            var clickText = form.querySelector('button[type="submit"]').innerText.trim();
            var dataLayerObject = {
                event: 'form_interaction',
                click_text: clickText,
                form_type: formType,
                form_name: formName,
                interaction_type: 'form_submission',
                interaction_response: interactionResponse
            };

            if (formType !== 'newsletter') {
                var storeLocationDropdown = form.querySelector('select[data-placeholder="Choose a location"]');
                dataLayerObject.store_location = storeLocationDropdown ? storeLocationDropdown.value : 'Unknown Location';
            }

            window.dataLayer.push(dataLayerObject);
            console.log("Successful: Data layer updated for form interaction");
        }, 2000);
    }

    function checkFormSubmissionResult() {
        var successMessage = document.querySelector('.frm_message');
        var errorMessage = document.querySelector('.frm_error_style');
        if (successMessage) {
            return 'successful';
        } else if (errorMessage) {
            return 'failed';
        } else {
            return 'unknown';
        }
    }

    document.body.addEventListener('submit', function(event) {
        var form = event.target.closest('form');
        if (!form) return;

        var formWrapper = form.closest('div[data-attribute="form_click"]');
        if (!formWrapper) return;

        console.log("Attributes/classes found for form submission");

        if (formWrapper.classList.contains('contact_click')) {
            console.log("Processing 'Contact Us' form");
            trackFormSubmission(form, 'contact form', 'Contact Us');
        } else if (formWrapper.classList.contains('newsletter_click')) {
            console.log("Processing 'Weekly Newsletter' form");
            trackFormSubmission(form, 'newsletter', 'Weekly Newsletter');
        } else if (formWrapper.classList.contains('quote-form_click')) {
            console.log("Processing 'Get a Quote' form");
            trackFormSubmission(form, 'quote request', 'Get a Quote');
        }
    }, true);
});
