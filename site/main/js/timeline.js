const line = document.querySelector('.timeline-container .line');
const scrollFrame = document.querySelector('.timeline-container');
const cardsContainer = document.querySelector('.timeline-cards');
const cards = cardsContainer.querySelectorAll('div:not(.card-dot, .card-text)');

function getDistanceFromCenterToTop(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    const centerY1 = rect1.top + rect1.height / 2;
    const topY2 = rect2.top;
    const verticalDistance = topY2 - centerY1;
    return verticalDistance;
}

function getDistanceBetweenDivs(div1, div2) {
    const rect1 = div1.getBoundingClientRect();
    const rect2 = div2.getBoundingClientRect();
    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

const div1 = cards[0].querySelector('.card-dot');
const div2 = cards[cards.length - 1].querySelector('.card-dot');

const distanceFromTop = getDistanceFromCenterToTop(div1, cardsContainer);
const distance = getDistanceBetweenDivs(div1, div2);
const combinedDistance = distance + 20;

line.style.height = - distanceFromTop + 'px';

function updateActiveCards() {
    const lineRect = line.getBoundingClientRect();
    cards.forEach(card => {
        const dot = card.querySelector('.card-dot');
        const dotRect = dot.getBoundingClientRect();
        
        console.log(`Line Rect: top=${lineRect.top}, bottom=${lineRect.bottom}`);
        console.log(`Dot Rect: top=${dotRect.top}, bottom=${dotRect.bottom}`);

        const dotCenterY = dotRect.top + dotRect.height / 2;
        if (lineRect.bottom >= dotCenterY && lineRect.top <= dotCenterY) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

scrollFrame.addEventListener('scroll', function () {
    const maxScroll = scrollFrame.scrollHeight - scrollFrame.clientHeight;
    const scrollPercentage = scrollFrame.scrollTop / maxScroll;
    const scrollAdjustedHeight = combinedDistance * scrollPercentage;

    const newHeight = Math.max(- distanceFromTop, - distanceFromTop + scrollAdjustedHeight);

    line.style.height = newHeight + 'px';

    updateActiveCards();
});
