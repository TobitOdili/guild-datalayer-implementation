    window.dataLayer = window.dataLayer || [];

    // Store players to prevent duplicate initialization
    var videoPlayers = [];

    function onYouTubeIframeAPIReady() {
        initializeVideoTracking();
    }

    document.addEventListener('DOMContentLoaded', function() {
        // If YouTube API is already ready, initialize tracking
        if (typeof YT !== 'undefined' && YT && YT.Player) {
            initializeVideoTracking();
        }
    });

    function initializeVideoTracking() {
        var videoIframes = document.querySelectorAll('iframe');

        videoIframes.forEach(function(iframe, index) {
            var src = iframe.getAttribute('src') || '';
            var isYouTube = src.includes('youtube.com') || src.includes('ytimg.com');
            var isVimeo = src.includes('vimeo.com');

            if (isYouTube) {
                // Initialize YouTube player
                var youTubePlayer = new YT.Player(iframe, {
                    events: {
                        'onStateChange': function(event) {
                            if (event.data == YT.PlayerState.PLAYING) {
                                var videoTitle = iframe.getAttribute('title') || 'YouTube Video ' + (index + 1);
                                pushVideoPlayEvent(videoTitle);
                            }
                        }
                    }
                });
                videoPlayers.push(youTubePlayer);
            } else if (isVimeo) {
                // Initialize Vimeo player
                var vimeoPlayer = new Vimeo.Player(iframe);
                vimeoPlayer.on('play', function() {
                    vimeoPlayer.getVideoTitle().then(function(title) {
                        var videoTitle = title || 'Vimeo Video ' + (index + 1);
                        pushVideoPlayEvent(videoTitle);
                    });
                });
                videoPlayers.push(vimeoPlayer);
            }
        });
    }

    function pushVideoPlayEvent(videoTitle) {
        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: 'video_play',
            video_title: videoTitle
        });
        console.log("Successful: Video click interaction pushed");
    }