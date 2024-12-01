window.dataLayer = window.dataLayer || [];

document.addEventListener('DOMContentLoaded', function() {
    function pushToDataLayer(interactionType, data = {}) {
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: interactionType,
            ...data
        });
        console.log(`Successful: ${interactionType} interaction pushed`);
    }

    function extractVideoTitle(element) {
        // Premium Gallery videos
        const galleryTitle = element.querySelector('.premium-gallery-img-name')?.textContent.trim();
        if (galleryTitle) return galleryTitle;

        // Single Vimeo video
        if (element.classList.contains('uael-video__outer-wrap')) {
            const iframe = element.querySelector('iframe');
            if (iframe?.src.includes('vimeo')) {
                return iframe.title || 'Vimeo Video';
            }
        }

        // YouTube playlist or single video
        if (element.classList.contains('video-item') || element.querySelector('.video-item')) {
            const iframe = element.querySelector('iframe');
            if (iframe?.src.includes('youtube')) {
                const playlistMatch = iframe.title.match(/playlist\s*(.*)/i);
                return playlistMatch ? playlistMatch[1] : iframe.title || 'YouTube Video';
            }
        }

        // Fallback to image alt text or generic title
        const img = element.querySelector('img');
        return img?.alt || 'Video Player';
    }

    function handleVideoClick(event) {
        const videoContainer = event.target.closest('[data-attribute="video_click"]');
        if (!videoContainer) return;

        // For YouTube iframes
        const iframe = event.target.closest('iframe');
        if (iframe?.src.includes('youtube')) {
            const videoTitle = extractVideoTitle(videoContainer);
            pushToDataLayer('video_click', { video_title: videoTitle });
            return;
        }

        // For Vimeo and Premium Gallery videos
        const isVideoClick = event.target.closest('.premium-gallery-video-item') ||
                           event.target.closest('.uael-video__play') ||
                           event.target.closest('.video-item') ||
                           event.target.closest('.pa-gallery-video-icon');

        if (isVideoClick) {
            const videoTitle = extractVideoTitle(videoContainer);
            pushToDataLayer('video_click', { video_title: videoTitle });
        }
    }

    // Handle clicks on video elements using event delegation
    document.addEventListener('click', handleVideoClick);

    // Add overlay for YouTube iframes to capture clicks
    document.querySelectorAll('[data-attribute="video_click"] iframe').forEach(iframe => {
        if (iframe.src.includes('youtube')) {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;cursor:pointer;';
            iframe.parentElement.style.position = 'relative';
            iframe.parentElement.insertBefore(overlay, iframe);
        }
    });

    // Initialize MutationObserver to handle dynamically loaded videos
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.matches('[data-attribute="video_click"] iframe')) {
                        if (node.src.includes('youtube')) {
                            const overlay = document.createElement('div');
                            overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;cursor:pointer;';
                            node.parentElement.style.position = 'relative';
                            node.parentElement.insertBefore(overlay, node);
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    console.log("Video click handlers initialized");
});