// Get the modal and related elements
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");
var images = document.getElementsByClassName("gallery-image");
var currentIndex;
var slideshowInterval;
var isDarkMode = false;

// Function to open modal and display the clicked image
function openModal(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
    captionText.innerHTML = images[index].alt;
    currentIndex = index;
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
    clearInterval(slideshowInterval);
}

// Function to show the previous image
function showPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    openModal(currentIndex);
}

// Function to show the next image
function showNext() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    openModal(currentIndex);
}

// Function to start slideshow
function startSlideshow() {
    slideshowInterval = setInterval(showNext, 3000);
    document.getElementById("slideshowToggle").innerText = "Stop Slideshow";
    document.getElementById("slideshowToggle").onclick = stopSlideshow;
}

// Function to stop slideshow
function stopSlideshow() {
    clearInterval(slideshowInterval);
    document.getElementById("slideshowToggle").innerText = "Start Slideshow";
    document.getElementById("slideshowToggle").onclick = startSlideshow;
}

// Function to toggle dark mode
function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.getElementById("darkModeToggle").innerText = isDarkMode ? "Light Mode" : "Dark Mode";
}

// Image upload and gallery update
var imageUpload = document.getElementById("imageUpload");
imageUpload.addEventListener("change", function(event) {
    var files = event.target.files;
    var galleryGrid = document.getElementById("galleryGrid");

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function(e) {
            var newImage = document.createElement("img");
            newImage.src = e.target.result;
            newImage.alt = "User Uploaded Image";
            newImage.classList.add("gallery-image");
            galleryGrid.appendChild(newImage);

            // Add click event for the new image
            newImage.addEventListener("click", function() {
                openModal(Array.from(images).indexOf(newImage));
            });
        };

        reader.readAsDataURL(file);
    }
});

// Add event listeners to gallery images
Array.from(images).forEach((image, index) => {
    image.addEventListener("click", function() {
        openModal(index);
    });
});

// Close the modal when the user clicks on <span> (x)
document.getElementsByClassName("close")[0].onclick = closeModal;

// Navigate with arrows
document.getElementsByClassName("prev")[0].onclick = showPrev;
document.getElementsByClassName("next")[0].onclick = showNext;

// Toggle slideshow
document.getElementById("slideshowToggle").onclick = startSlideshow;

// Toggle dark mode
document.getElementById("darkModeToggle").onclick = toggleDarkMode;

// Keyboard navigation
document.onkeydown = function(e) {
    switch (e.key) {
        case "ArrowLeft":
            showPrev();
            break;
        case "ArrowRight":
            showNext();
            break;
        case "Escape":
            closeModal();
            break;
    }
};
