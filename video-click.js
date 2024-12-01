    window.dataLayer = window.dataLayer || [];

    function handleVideoClick(event, videoIndex) {
        var videoElement = event.target.closest('[data-attribute="video_click"]');

        if (videoElement) {
            var videoTitle = videoElement.querySelector('img')?.alt;
            if (!videoTitle || videoTitle.trim() === '') {
                // Use 'Video ' followed by the index among tracked video elements
                videoTitle = 'Video ' + (videoIndex + 1);
            }

            window.dataLayer.push({
                event: 'content_interaction',
                interaction_type: 'video_click',
                video_title: videoTitle
            });

            console.log("Successful: Video click interaction pushed");
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        var videoElements = document.querySelectorAll('[data-attribute="video_click"]');

        if (videoElements.length > 0) {
            console.log("Successful: Video elements with data-attribute found");

            videoElements.forEach((videoElement, index) => {
                videoElement.addEventListener('click', function(event) {
                    handleVideoClick(event, index);
                });
                console.log("Successful: Click event listener attached to video element");
            });
        } else {
            console.log("Failed: Video elements with data-attribute not found");
        }
    });