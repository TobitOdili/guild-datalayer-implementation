    window.dataLayer = window.dataLayer || [];

    function handleLinkClick(event) {
        var link = event.target.closest('a');
        if (!link) {
            return;
        }
        
        // Prevent multiple event triggering
        event.stopPropagation();

        var clickText = link.innerText.trim();

        var sectionElement = link.closest('[data-section]');
        var eventSection = sectionElement ? sectionElement.getAttribute('data-section') : 'body';

        // Default interaction type
        var interactionType = 'link_click';

        // Check if the click text is a phone number
        var phoneNumberRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (phoneNumberRegex.test(clickText)) {
            interactionType = 'phone_click';
        } else {
            // Check if the click text contains '@' character, indicating it might be an email
            var emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
            if (emailRegex.test(clickText)) {
                interactionType = 'email_click';
            }
        }

        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: interactionType,
            event_section: eventSection,
            click_text: clickText
        });

        console.log("Content interaction " + interactionType + " pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        var linkElements = document.querySelectorAll('.link_click, .link_click a');

        if (linkElements.length > 0) {
            linkElements.forEach(element => {
                element.addEventListener('click', handleLinkClick);
            });
        } else {
            console.log("Failed: Link elements and/or containers with .link_click class not found");
        }
    });
