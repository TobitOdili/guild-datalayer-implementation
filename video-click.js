    window.dataLayer = window.dataLayer || [];

    document.addEventListener('DOMContentLoaded', function() {
        var videoElements = document.querySelectorAll('[data-attribute="video_click"]');

        var youtubeIframes = [];
        var vimeoIframes = [];

        if (videoElements.length > 0) {
            console.log("Successful: Video elements with data-attribute found");

            videoElements.forEach((videoElement, index) => {
                // For the video grid and single video, attach click event listener
                videoElement.addEventListener('click', function(event) {
                    handleVideoClick(event, index);
                });
                console.log("Successful: Click event listener attached to video element");

                // For YouTube and Vimeo embeds, set up their respective APIs
                var iframeElements = videoElement.querySelectorAll('iframe');
                iframeElements.forEach(function(iframe) {
                    var src = iframe.getAttribute('src');
                    if (src && (src.includes('youtube.com') || src.includes('youtu.be'))) {
                        // YouTube iframe
                        youtubeIframes.push({iframe: iframe, index: index});
                    } else if (src && src.includes('vimeo.com')) {
                        // Vimeo iframe
                        vimeoIframes.push({iframe: iframe, index: index});
                    }
                });
            });

            // Initialize YouTube API if needed
            if (youtubeIframes.length > 0) {
                loadYouTubeAPI();
            }

            // Initialize Vimeo API if needed
            if (vimeoIframes.length > 0) {
                loadVimeoAPI();
            }

        } else {
            console.log("Failed: Video elements with data-attribute not found");
        }

        function handleVideoClick(event, videoIndex) {
            var videoElement = event.target.closest('[data-attribute="video_click"]');

            if (videoElement) {
                var videoTitle = null;

                // Try to find an img alt text
                var imgElement = videoElement.querySelector('img');
                if (imgElement && imgElement.alt.trim() !== '') {
                    videoTitle = imgElement.alt.trim();
                }

                // If no img or alt text, try to find an iframe title
                if (!videoTitle) {
                    var iframeElement = videoElement.querySelector('iframe');
                    if (iframeElement && iframeElement.title.trim() !== '') {
                        videoTitle = iframeElement.title.trim();
                    }
                }

                // If still no title, use default
                if (!videoTitle) {
                    videoTitle = 'Video ' + (videoIndex + 1);
                }

                window.dataLayer.push({
                    event: 'content_interaction',
                    interaction_type: 'video_click',
                    video_title: videoTitle
                });

                console.log("Successful: Video click interaction pushed for video: " + videoTitle);
            }
        }

        // YouTube API functions
        function loadYouTubeAPI() {
            if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
                var tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

                window.onYouTubeIframeAPIReady = initializeYouTubePlayers;
            } else {
                initializeYouTubePlayers();
            }
        }

        function initializeYouTubePlayers() {
            youtubeIframes.forEach(function(item) {
                var iframe = item.iframe;
                var videoIndex = item.index;

                // Assign an ID to the iframe if it doesn't have one
                if (!iframe.id) {
                    iframe.id = 'youtube-player-' + videoIndex;
                }

                var player = new YT.Player(iframe.id, {
                    events: {
                        'onStateChange': function(event) {
                            if (event.data == YT.PlayerState.PLAYING) {
                                handleYouTubePlay(event.target, videoIndex);
                            }
                        }
                    }
                });
            });
        }

        function handleYouTubePlay(player, videoIndex) {
            var iframe = player.getIframe();
            var videoTitle = iframe.title || 'YouTube Video ' + (videoIndex + 1);

            window.dataLayer.push({
                event: 'content_interaction',
                interaction_type: 'video_click',
                video_title: videoTitle
            });

            console.log("Successful: Video play interaction pushed for YouTube video: " + videoTitle);
        }

        // Vimeo API functions
        function loadVimeoAPI() {
            if (typeof Vimeo === 'undefined') {
                var vimeoTag = document.createElement('script');
                vimeoTag.src = "https://player.vimeo.com/api/player.js";
                vimeoTag.onload = initializeVimeoPlayers;
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(vimeoTag, firstScriptTag);
            } else {
                initializeVimeoPlayers();
            }
        }

        function initializeVimeoPlayers() {
            vimeoIframes.forEach(function(item) {
                var iframe = item.iframe;
                var videoIndex = item.index;

                var player = new Vimeo.Player(iframe);
                player.on('play', function() {
                    handleVimeoPlay(iframe, videoIndex);
                });
            });
        }

        function handleVimeoPlay(iframe, videoIndex) {
            var videoTitle = iframe.getAttribute('title') || 'Vimeo Video ' + (videoIndex + 1);

            window.dataLayer.push({
                event: 'content_interaction',
                interaction_type: 'video_click',
                video_title: videoTitle
            });

            console.log("Successful: Video play interaction pushed for Vimeo video: " + videoTitle);
        }
    });