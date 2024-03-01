function handleAccordionClick(event) {
    var clickedElement = event.target.closest('.elementor-tab-title, .ekit-accordion--toggler');
    if (!clickedElement) return;

    var accordionTitle, accordionStatus;
    if (clickedElement.classList.contains('elementor-tab-title')) {
        accordionTitle = clickedElement.querySelector('.elementor-accordion-title').innerText.trim();
        setTimeout(() => {
            accordionStatus = clickedElement.getAttribute('aria-expanded') === 'true' ? 'open' : 'close';
            pushDataLayer(accordionTitle, accordionStatus);
        }, 100);
    } else if (clickedElement.classList.contains('ekit-accordion--toggler')) {
        accordionTitle = clickedElement.querySelector('.ekit-accordion-title').innerText.trim();
        setTimeout(() => {
            accordionStatus = clickedElement.getAttribute('aria-expanded') === 'true' ? 'open' : 'close';
            pushDataLayer(accordionTitle, accordionStatus);
        }, 100);
    }
}

function pushDataLayer(title, status) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': 'content_interaction',
        'interaction_type': 'accordion_click',
        'interaction_status': status,
        'click_text': title
    });
    console.log("Accordion click Datalayer Push");
}

function initAccordionEventListeners() {
    document.querySelectorAll('.elementor-tab-title, .ekit-accordion--toggler')
        .forEach(element => element.addEventListener('click', handleAccordionClick));
}

document.addEventListener('DOMContentLoaded', initAccordionEventListeners);
