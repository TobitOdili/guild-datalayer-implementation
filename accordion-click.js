document.addEventListener('DOMContentLoaded', function() {
    let lastClickedDetailsElement = null;

    function handleAccordionClick(event) {
        const clickedElement = event.target.closest('.elementor-tab-title, .ekit-accordion--toggler');
        if (!clickedElement) return;

        let accordionTitle, accordionStatus;

        if (clickedElement.classList.contains('elementor-tab-title')) {
            accordionTitle = clickedElement.querySelector('.elementor-accordion-title').innerText.trim();
            setTimeout(function() {
                accordionStatus = clickedElement.getAttribute('aria-expanded') === 'true' ? 'open' : 'close';
                pushDataLayer(accordionTitle, accordionStatus);
            }, 100);
        } else if (clickedElement.classList.contains('ekit-accordion--toggler')) {
            accordionTitle = clickedElement.querySelector('.ekit-accordion-title').innerText.trim();
            setTimeout(function() {
                accordionStatus = clickedElement.getAttribute('aria-expanded') === 'true' ? 'open' : 'close';
                pushDataLayer(accordionTitle, accordionStatus);
            }, 100);
        }
    }

    function handleNewAccordionClick(event) {
        const summaryElement = event.target.closest('.e-n-accordion-item-title');
        if (!summaryElement) return;

        const detailsElement = summaryElement.parentElement; // The <details> element
        if (!detailsElement) return;

        lastClickedDetailsElement = detailsElement;

        // Attach a one-time 'toggle' event listener to the clicked details element
        detailsElement.addEventListener('toggle', handleAccordionToggle, { once: true });
    }

    function handleAccordionToggle(event) {
        const detailsElement = event.target;
        if (detailsElement !== lastClickedDetailsElement) return; // Ignore if it's not the one we clicked

        const summaryElement = detailsElement.querySelector('.e-n-accordion-item-title');
        if (!summaryElement) return;

        const titleElement = summaryElement.querySelector('.e-n-accordion-item-title-text');
        if (!titleElement) return;

        const accordionTitle = titleElement.innerText.trim();
        const isOpen = detailsElement.hasAttribute('open');
        const accordionStatus = isOpen ? 'open' : 'close';

        pushDataLayer(accordionTitle, accordionStatus);

        // Reset the last clicked element
        lastClickedDetailsElement = null;
    }

    function pushDataLayer(title, status) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'accordion_click',
            accordion_status: status,
            click_text: title
        });
        console.log('Accordion click DataLayer Push:', status);
    }

    function initAccordionEventListeners() {
        // Existing accordions
        document.querySelectorAll('.elementor-tab-title, .ekit-accordion--toggler')
            .forEach(element => element.addEventListener('click', handleAccordionClick));

        // New accordion type using <summary>
        document.querySelectorAll('.e-n-accordion-item-title').forEach(summaryElement => {
            summaryElement.addEventListener('click', handleNewAccordionClick);
        });
    }

    // Initialize event listeners after DOM is loaded
    initAccordionEventListeners();
});