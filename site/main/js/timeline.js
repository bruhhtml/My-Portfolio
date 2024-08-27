// timeline.js

const updateLineHeight = () => {
    const timelineDivs = document.querySelectorAll('.timeline.internal-scroll');
    timelineDivs.forEach(timelineDiv => {
        const lineDiv = timelineDiv.querySelector('.line');
        if (!lineDiv) return; // Exit if no .line element is found

        const scrollPosition = timelineDiv.scrollTop;
        const maxScroll = timelineDiv.scrollHeight - timelineDiv.clientHeight;

        const cardsDiv = timelineDiv.querySelector('.cards');
        const firstCard = cardsDiv.querySelector('.card:first-child');
        const lastCard = cardsDiv.querySelector('.card:last-child');

        if (!firstCard || !lastCard) return; // Exit if no cards are found

        const firstDot = firstCard.querySelector('.dot');
        const lastDot = lastCard.querySelector('.dot');

        if (!firstDot || !lastDot) return; // Exit if no dots are found

        const firstDotOffsetTop = firstDot.offsetTop + firstCard.offsetTop;
        const distanceToFirstDot = firstDotOffsetTop - cardsDiv.offsetTop + 10;

        const lastDotOffsetTop = lastDot.offsetTop + lastCard.offsetTop;
        const distanceToLastDot = lastDotOffsetTop - cardsDiv.offsetTop + 10;

        const normalizedScroll = scrollPosition / maxScroll;
        let newLineHeight = normalizedScroll * (distanceToLastDot - distanceToFirstDot) + distanceToFirstDot;

        newLineHeight = Math.max(distanceToFirstDot, Math.min(newLineHeight, distanceToLastDot));
        lineDiv.style.height = `${newLineHeight}px`;

        const cards = cardsDiv.querySelectorAll('.card');
        cards.forEach(card => {
            const dot = card.querySelector('.dot');
            const dotPosition = dot.offsetTop + card.offsetTop - cardsDiv.offsetTop;

            if (newLineHeight >= dotPosition) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    });
};

// Ensure that the timeline elements have the correct event listeners
const initializeTimelineListeners = () => {
    const timelines = document.querySelectorAll('.timeline.internal-scroll');
    timelines.forEach(timeline => {
        timeline.addEventListener('scroll', updateLineHeight);
    });
    updateLineHeight(); // Initialize on page load
};

// Initialize timeline listeners on page load
document.addEventListener('DOMContentLoaded', initializeTimelineListeners);
