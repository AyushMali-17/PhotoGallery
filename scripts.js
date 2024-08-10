// JavaScript for handling the modal functionality

// Get the modal and related elements
var modal = document.getElementById("imageModal");
var modalImg = document.getElementById("modalImage");
var captionText = document.getElementById("caption");

// Get the images and initialize current image index
var images = document.getElementsByClassName("gallery-image");
var currentIndex;

// Display image in modal and set caption
function openModal(index) {
    modal.style.display = "block";
    modalImg.src = images[index].src;
    captionText.innerHTML = images[index].alt;
    currentIndex = index;
}

// Close the modal
function closeModal() {
    modal.style.display = "none";
}

// Show the previous image
function showPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    openModal(currentIndex);
}

// Show the next image
function showNext() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    openModal(currentIndex);
}

// Attach click events to images
for (var i = 0; i < images.length; i++) {
    images[i].onclick = function() {
        var index = Array.prototype.indexOf.call(images, this);
        openModal(index);
    }
}

// Attach event listeners for modal controls
document.getElementsByClassName("close")[0].onclick = function() { 
    closeModal();
}

document.getElementsByClassName("prev")[0].onclick = function() { 
    showPrev();
}

document.getElementsByClassName("next")[0].onclick = function() { 
    showNext();
}

// Keyboard navigation
document.onkeydown = function(event) {
    if (modal.style.display === "block") {
        switch (event.keyCode) {
            case 37: // Left arrow key
                showPrev();
                break;
            case 39: // Right arrow key
                showNext();
                break;
            case 27: // Escape key
                closeModal();
                break;
        }
    }
}

// Close modal on clicking outside of the image
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}
