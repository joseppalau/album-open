// Progress Bar
var num_selected = document.getElementById("num_selected").value
var max_photos = document.getElementById("max_photos").value
Number(num_selected)
Number(max_photos)
var albumBar = document.getElementById("album-bar");
var ctx = albumBar.getContext("2d");
ctx.fillStyle = 'green';
var coverX = albumBar.width / max_photos * num_selected;
ctx.fillRect(0,0,coverX,albumBar.height);

console.log(num_selected)


// model comment
var modal = document.getElementById('modalComment');
// Get the button that opens the modal
var btn = document.getElementById("btn-model-comment");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

//Image gallery
var slideIndex = 1;
showSlides(slideIndex);
// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}


