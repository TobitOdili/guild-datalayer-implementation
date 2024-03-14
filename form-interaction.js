
		document.addEventListener('DOMContentLoaded', function() {
			var formElements = document.querySelectorAll('[data-attribute="form_interaction"]');

			if (formElements.length > 0) {
				console.log("Successful: Form elements with data-attribute found");

				// Event Delegation for Form Submissions
				document.addEventListener('submit', function(event) {
					const form = event.target.closest('form');

					if (form && form.closest('[data-attribute="form_interaction"]')) { // Check if within our target
						event.preventDefault();

						var buttonText = form.querySelector('button[type="submit"]').textContent.trim();
						var formName = form.getAttribute('name');
						var interactionResponse;

						var formWrapper = form.closest('[data-form-type]');
						var formType = formWrapper ? formWrapper.getAttribute('data-form-type') : null;

						setTimeout(function() {
							var isSuccess = form.querySelector('.elementor-message-success');
							var isError = form.querySelector('.elementor-message-danger'); // Check for error

							if (isSuccess) {
								interactionResponse = 'successful';
							} else if (isError) {
								interactionResponse = 'failed'; // Update for error scenario
							} else {
								console.log("Waiting for success/error message...");
								setTimeout(function() {
									isSuccess = form.querySelector('.elementor-message-success');
									isError = form.querySelector('.elementor-message-danger');

									if (isSuccess) {
										interactionResponse = 'successful';
									} else if (isError) { 
										interactionResponse = 'failed';
									} else {
										console.log("No success/error message found. Form interaction status unknown.");
										interactionResponse = 'unknown'; // Indicate unknown status
									}
								}, 5000); // Wait additional 5 seconds
							}

							// Extracting additional data for 'annuity_quote' forms
							if (formType === "annuity_quote") {
								// ... (Existing code remains the same) ...
							} else { // Original 'Data Layer' push if not the Quote form type
								window.dataLayer = window.dataLayer || [];
								window.dataLayer.push({
									event: 'form_interaction',
									click_text: buttonText,
									form_type: formType,
									form_name: formName,
									interaction_type: 'form_submission',
									interaction_response: interactionResponse 
								});

								console.log("Data Layer Pushed: Form Interaction Event");
							}
						}, 5000); // Initial wait time
					}
				});

			} else {
				console.log("Failed: Form elements with data-attribute not found");
			}
		});

