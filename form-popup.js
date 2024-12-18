document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - Initializing popup handler');

    const popupId = 'elementor-popup-modal-16923';
    let activeProductName = '';
    let popupObserver = null;
    let retryCount = 0; // Track the number of retries
    const maxRetries = 10; // Maximum retries allowed

    // Function to update the form name
    function updateFormName(name) {
        console.log('Attempting to update form name with:', name);
        const formCartName = document.querySelector('.form_cart-name');
        if (formCartName) {
            formCartName.textContent = name;
            console.log('Successfully updated form name');
        } else {
            console.log('Form cart name element not found');
        }
    }

    // Function to handle popup visibility changes
    function handlePopupVisibility(popup) {
        if (popup.style.display !== 'none') {
            console.log('Popup is visible');

            // Try multiple times to update the form name
            let attempts = 0;
            const maxAttempts = 5;

            const tryUpdate = () => {
                if (attempts >= maxAttempts) {
                    console.log('Max attempts reached for updating form name');
                    return;
                }

                const formCartName = document.querySelector('.form_cart-name');
                if (formCartName && activeProductName) {
                    console.log('Updating form name to:', activeProductName);
                    formCartName.textContent = activeProductName;
                } else {
                    attempts++;
                    setTimeout(tryUpdate, 100);
                }
            };

            tryUpdate();
        }
    }

    // Listen for clicks on the entire document (event delegation)
    document.addEventListener('click', (event) => {
        const quoteButton = event.target.closest('[href*="popup%3Aopen"]');
        if (!quoteButton) return;

        console.log('Quote button clicked');

        // Find the closest product container
        const productContainer = quoteButton.closest('.single_product-loop');
        if (!productContainer) return;

        const cartName = productContainer.querySelector('.cart-name .elementor-heading-title');
        if (cartName) {
            activeProductName = cartName.textContent || '';
            console.log('Product name captured:', activeProductName);
        }
    });

    // Set up mutation observer for popup
    function setupPopupObserver() {
        if (popupObserver) {
            popupObserver.disconnect(); // Disconnect any existing observer
        }

        const popup = document.getElementById(popupId);
        if (!popup) {
            if (retryCount < maxRetries) {
                retryCount++;
                setTimeout(setupPopupObserver, 500);
            }
            return;
        }

        popupObserver = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    handlePopupVisibility(mutation.target);
                }
            });
        });

        popupObserver.observe(popup, {
            attributes: true,
            attributeFilter: ['style']
        });

        // Check initial state
        handlePopupVisibility(popup);
    }

    // Initial setup
    setupPopupObserver();

    // Cleanup on page unload
    window.addEventListener('unload', () => {
        if (popupObserver) popupObserver.disconnect();
    });
});
