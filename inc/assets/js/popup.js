document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('shopPopup');
    const closeButton = document.querySelector('.close-popup');
    const posterImg = document.querySelector('.popup-poster');

    // Array of poster image filenames
    const posters = [
        'inc/assets/images/shop-opening-poster-1.jpg',
        'inc/assets/images/shop-opening-poster-2.jpg',
        'inc/assets/images/shop-opening-poster-3.jpg',
    ];

    // Show popup when page loads
    setTimeout(() => {
        // Pick a random poster
        const randomPoster = posters[Math.floor(Math.random() * posters.length)];
        posterImg.src = randomPoster;
        popup.classList.add('active');
        triggerConfetti();
    }, 1000);

    // Close popup when close button is clicked
    closeButton.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});

function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 20, spread: 360, ticks: 200, zIndex: 2100 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // since particles fall down, start a bit higher than random
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
} 