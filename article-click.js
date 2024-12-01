    window.dataLayer = window.dataLayer || [];

    function handleArticleClick(event) {


        var clickedElement = event.target;
        var isImageClick = clickedElement.tagName === 'IMG';
        var isLinkClick = clickedElement.closest('a');

        // Find the common ancestor for both image and link clicks
        var commonAncestor = clickedElement.closest('.dl-blog-post-grid');

        if (!commonAncestor) {
            console.log("Failed: Common ancestor not found for clicked element");
            return;
        }

        // Find the nearest h2 or title element within the common ancestor
        var articleTitleElement = commonAncestor.querySelector('h2, .elementor-heading-title');
        var articleTitle = articleTitleElement ? articleTitleElement.innerText.trim() : 'unknown';

        window.dataLayer.push({
            event: 'content_interaction',
            interaction_type: isImageClick ? 'article_click' : 'article_click',
            click_text: articleTitle
        });

        console.log("Successful: " + (isImageClick ? "Article" : "Article") + " click interaction pushed");
    }

    document.addEventListener('DOMContentLoaded', function() {
        var articleGrids = document.querySelectorAll('[data-attribute="article_click"]');
        if (articleGrids.length) {
            console.log("Successful: Article grids with data-attribute found");
            articleGrids.forEach(grid => {
                grid.addEventListener('click', handleArticleClick);
            });
        } else {
            console.log("Failed: Article grids with data-attribute not found");
        }
    });