// scripts/main.js

document.addEventListener("DOMContentLoaded", function() {
    const areas = document.querySelectorAll('area');
    const closeButtons = document.querySelectorAll('.close');
    const image = document.querySelector('.responsive-image');
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');

    // Function to open the modal
    function openModal(spot) {
        document.getElementById('modal' + spot).style.display = "block";
    }

    // Function to close the modal
    function closeModal(spot) {
        document.getElementById('modal' + spot).style.display = "none";
    }

    // Attach click event to each area to open the corresponding modal
    areas.forEach(area => {
        area.addEventListener('click', function(event) {
            event.preventDefault();
            const spot = this.getAttribute('data-spot');
            openModal(spot);
        });
    });

    // Attach click event to each close button to close the corresponding modal
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const spot = this.getAttribute('data-spot');
            closeModal(spot);
        });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = "none";
        }
    });

    // Function to resize the map coordinates
    function resizeMap() {
        const originalWidth = image.naturalWidth;
        const currentWidth = image.clientWidth; // Use clientWidth for resized width
        const scaleFactor = currentWidth / originalWidth;

        areas.forEach(area => {
            const coords = area.dataset.coords;
            if (coords) {
                const coordsArray = coords.split(',').map(Number);
                const scaledCoords = coordsArray.map(coord => Math.round(coord * scaleFactor));
                area.coords = scaledCoords.join(',');
            }
        });
    }

    // Attach the resize function to the window resize and load events
    window.addEventListener('resize', resizeMap);
    window.addEventListener('load', resizeMap);
    // Call resizeMap initially in case the image is already loaded
    if (image.complete) {
        resizeMap();
    } else {
        image.addEventListener('load', resizeMap);
    }

    // Toggle mobile navigation
    hamburger.addEventListener('click', function() {
        if (mobileNav.style.display === 'flex') {
            mobileNav.style.display = 'none';
        } else {
            mobileNav.style.display = 'flex';
        }
    });

    // Hide mobile nav when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target !== mobileNav && event.target !== hamburger) {
            mobileNav.style.display = 'none';
        }
    });
});
