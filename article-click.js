window.dataLayer = window.dataLayer || [];

function handleArticleClick(event) {
    const clickedElement = event.target;

    // Only proceed if we clicked on a clickable element
    if (!isClickableElement(clickedElement)) {
        return;
    }

    const loopItem = clickedElement.closest('.e-loop-item');
    if (!loopItem) {
        console.log("Failed: Loop item not found for clicked element");
        return;
    }

    const gridContainer = clickedElement.closest('.dl-blog-post-grid, .dl-news-grid');
    if (!gridContainer) {
        console.log("Failed: Grid container not found for clicked element");
        return;
    }

    const titleElement = loopItem.querySelector('.elementor-heading-title');
    const articleTitle = titleElement ? titleElement.innerText.trim() : null;
    if (!articleTitle) {
        console.log("Failed: Title not found in loop item");
        return;
    }

    const isBlogPost = gridContainer.classList.contains('dl-blog-post-grid');
    const interactionType = isBlogPost ? 'article_click' : 'news_click';

    // Push to dataLayer
    window.dataLayer.push({
        event: 'content_interaction',
        interaction_type: interactionType,
        click_text: articleTitle
    });

    console.log(`Successful: ${isBlogPost ? "Article" : "News"} click interaction pushed`);
}

function isClickableElement(element) {
    // Check if the clicked element is a title, image, or "Read Post" button
    return (
        element.closest('.elementor-heading-title') ||
        element.tagName === 'IMG' ||
        (element.closest('.elementor-button') && 
         element.closest('.elementor-button').querySelector('.elementor-button-text')?.innerText.trim() === 'Read Post')
    );
}

document.addEventListener('DOMContentLoaded', function() {
    const gridContainers = document.querySelectorAll('.dl-blog-post-grid, .dl-news-grid');
    
    if (gridContainers.length) {
        console.log("Successful: Article grids found");
        
        gridContainers.forEach(container => {
            container.addEventListener('click', handleArticleClick);
        });
    } else {
        console.log("Failed: No article grids found");
    }
});
