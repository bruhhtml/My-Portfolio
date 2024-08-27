// snapscroll.js

const container = document.querySelector('.container:not(.image)');
const sections = document.querySelectorAll('.snapscroll');

let isScrolling = false;
let currentIndex = 0; // To track the current section index

const handleScroll = (deltaY) => {
    if (isScrolling) return;

    const currentSection = sections[currentIndex];
    const hasInternalScroll = currentSection.classList.contains('internal-scroll');

    if (hasInternalScroll) {
        // Check if the scrollable section is still within its internal scroll range
        const atTop = currentSection.scrollTop === 0;
        const atBottom = currentSection.scrollHeight - currentSection.scrollTop === currentSection.clientHeight;

        if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) {
            // Allow scrolling within the internal scrollable element
            return;
        }
    }

    // If internal scrolling is not allowed or is complete, handle section scroll
    isScrolling = true;

    if (deltaY > 0 && currentIndex < sections.length - 1) {
        // Scroll down to the next section
        currentIndex++;
    } else if (deltaY < 0 && currentIndex > 0) {
        // Scroll up to the previous section
        currentIndex--;
    }

    // Snap to the determined section
    sections[currentIndex].scrollIntoView({ behavior: 'smooth' });

    // Disable further scrolling for a brief period to avoid skipping sections
    setTimeout(() => {
        isScrolling = false;
    }, 1000); // Adjust the time as necessary
};

container.addEventListener('wheel', (event) => {
    event.preventDefault(); // Prevent default scrolling behavior
    handleScroll(event.deltaY);
}, { passive: false });

let touchStartY = 0;
container.addEventListener('touchstart', (event) => {
    touchStartY = event.touches[0].clientY;
}, { passive: true });

container.addEventListener('touchmove', (event) => {
    const touchEndY = event.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    handleScroll(deltaY);
}, { passive: true });
