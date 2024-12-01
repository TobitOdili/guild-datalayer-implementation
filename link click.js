window.dataLayer = window.dataLayer || [];

function handleLinkClick(event) {
  var link = event.target.closest('a');
  if (!link) {
    return;
  }

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

  // Check if the clicked link or its parent has 'store_location' class
  var storeLocationElement = link.closest('.store_location');

  var dataLayerObject = {
    event: 'content_interaction',
    interaction_type: interactionType,
    click_text: clickText,
    event_section: eventSection // Default event_section value
  };

  // Replace 'event_section' with 'store_location' if condition is met
  if (storeLocationElement) {
    dataLayerObject.store_location = eventSection;
    delete dataLayerObject.event_section; // Remove the event_section parameter
  }

  window.dataLayer.push(dataLayerObject);

  console.log("Content interaction " + interactionType + " pushed");
}

document.addEventListener('DOMContentLoaded', function() {
  // Use event delegation for links with 'link_click' class
  document.addEventListener('click', function(event) {
    var clickedElement = event.target;
    
    // Check if the clicked element or any of its parents has class 'link_click'
    if (clickedElement.classList.contains('link_click') || clickedElement.closest('.link_click')) {
      handleLinkClick(event);
    }
  });
});