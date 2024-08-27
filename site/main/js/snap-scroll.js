const snapScroll_Container = document.querySelector('.snap-scrolling');
const scrollSections = document.querySelectorAll('.snap-scrolling .snap-section');
const scrollBars = document.querySelectorAll('.markers .marker');

let currentSection = 1;

let lastScroll = 10;

let scrollTimeout;

snapScroll_Container.addEventListener('scroll', function(e) {

    scrollEvent(e);

})


function scrollEvent(e) {

    clearTimeout(scrollTimeout);

    scrollTimeout = setInterval(() => {
        
        if (e.target == snapScroll_Container) {

            let scrollDirection = snapScroll_Container.scrollTop - lastScroll;
    
            let currentScroll = (snapScroll_Container.scrollHeight / scrollSections.length) + snapScroll_Container.scrollTop;

            if (scrollDirection > 0) {

                if (currentScroll > currentSection * (snapScroll_Container.scrollHeight / scrollSections.length) + 10) {

                    if (currentSection + 1 <= scrollSections.length) {

                        scrollBars[currentSection - 1].classList.remove('active');

                        currentSection += 1;

                        scrollBars[currentSection - 1].classList.add('active');

                    }
                }
                
                
            } else if (scrollDirection < 0) {

                if (currentScroll < currentSection * (snapScroll_Container.scrollHeight / scrollSections.length)) {

                    if (currentSection - 1 >= 1) {

                        scrollBars[currentSection - 1].classList.remove('active');

                        currentSection -= 1;

                        scrollBars[currentSection - 1].classList.add('active');

                    }

                    

                }

            }

            lastScroll = snapScroll_Container.scrollTop;
        }
    }, 100);

    

}