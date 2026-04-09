/* a-plus.js */

document.addEventListener('DOMContentLoaded', () => {

    /* --- Feature Switcher: Tabs at Top --- */
    const tabsContainer = document.querySelector('.feature-switcher-tabs');
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.tab-item');
        const title = tabsContainer.querySelector('.feature-overlay h2');
        const description = tabsContainer.querySelector('.feature-overlay p');
        const arrowLeft = tabsContainer.querySelector('.arrow-left');
        const arrowRight = tabsContainer.querySelector('.arrow-right');
        
        let currentIndex = 0;

        function updateSwitcher(index) {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active to current
            tabs[index].classList.add('active');

            // Update content
            const data = JSON.parse(tabs[index].getAttribute('data-content'));
            title.textContent = data.title;
            description.textContent = data.description;
            
            // Try updating img tag first for natural height adaptation
            const bgImg = tabsContainer.querySelector('.aplus-switcher-bg');
            if (bgImg) {
                bgImg.src = data.image;
            } else {
                tabsContainer.style.backgroundImage = `url(${data.image})`;
            }

            currentIndex = index;
            
            // On mobile, scroll the active tab into view (Disabled as it causes page jump on load)
            // tabs[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => updateSwitcher(index));
        });

        if (arrowLeft) {
            arrowLeft.addEventListener('click', () => {
                let index = currentIndex - 1;
                if (index < 0) index = tabs.length - 1;
                updateSwitcher(index);
            });
        }

        if (arrowRight) {
            arrowRight.addEventListener('click', () => {
                let index = currentIndex + 1;
                if (index >= tabs.length) index = 0;
                updateSwitcher(index);
            });
        }

        // Initialize first state
        updateSwitcher(0);
    }

    /* --- Feature Switcher: Numbered Tabs on Right --- */
    const numberedContainer = document.querySelector('.feature-switcher-numbered');
    if (numberedContainer) {
        const nTabs = numberedContainer.querySelectorAll('.numbered-tab');
        const nTitle = numberedContainer.querySelector('.numbered-overlay h2');
        const nDescription = numberedContainer.querySelector('.numbered-overlay p');
        const nArrowLeft = numberedContainer.querySelector('.arrow-left');
        const nArrowRight = numberedContainer.querySelector('.arrow-right');

        let currentIndexN = 0;

        function updateNumberedSwitcher(index) {
            nTabs.forEach(t => t.classList.remove('active'));
            nTabs[index].classList.add('active');

            const data = JSON.parse(nTabs[index].getAttribute('data-content'));
            nTitle.textContent = data.title;
            nDescription.textContent = data.description;
            
            const bgImgN = numberedContainer.querySelector('.aplus-switcher-bg');
            if (bgImgN) {
                bgImgN.src = data.image;
            } else {
                numberedContainer.style.backgroundImage = `url(${data.image})`;
            }

            currentIndexN = index;
        }

        nTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => updateNumberedSwitcher(index));
        });

        if (nArrowLeft) {
            nArrowLeft.addEventListener('click', () => {
                let index = currentIndexN - 1;
                if (index < 0) index = nTabs.length - 1;
                updateNumberedSwitcher(index);
            });
        }

        if (nArrowRight) {
            nArrowRight.addEventListener('click', () => {
                let index = currentIndexN + 1;
                if (index >= nTabs.length) index = 0;
                updateNumberedSwitcher(index);
            });
        }

        // Initialize
        updateNumberedSwitcher(0);
    }
});
