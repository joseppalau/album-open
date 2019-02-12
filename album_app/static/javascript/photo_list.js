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
var btn = document.getElementById("btn-modal-comment");
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

//Avatars
var count_avatars = 0
function choose_avatar(avatar_img){
    count_avatars += 1;
    if (count_avatars > 0){
        btn = document.getElementById('btn-comment');
        btn.disabled = false;
        btn.style.opacity = 1;
    }
    avatar_img.style.border = '1px solid green';
    avatar = document.getElementById("avatarInput");
    avatar.value = avatar_img.id;

    avatars = document.getElementsByClassName('avatar-class');
    for (i=0; i < avatars.length; i++){
        avatars[i].style.opacity = 0.5;
    }
    avatar_img.style.opacity = 1;
}

function reset_avatars(){
    avatars = document.getElementsByClassName('avatar-class');
    btn = getElementById('btn-comment')
    for (i=0; i < avatars.length; i++){
        avatars[i].style.opacity = 0.5;
    }
    btn.disabled = true;
    count_avatars = 0;
}

// VALUE MODAL
var modal_value = document.getElementById('modal-value');
// Get the button that opens the modal
var btn_value = document.getElementById("btn-modal-value");
// Get the <span> element that closes the modal
var span_value = document.getElementById("close-value");
// When the user clicks the button, open the modal

var buttons_value = document.getElementsByClassName('btn-values')
var input_value = document.getElementById('valueInput')
var okValue = document.getElementById('okValue')

btn_value.onclick = function() {
  modal_value.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span_value.onclick = function() {
  modal_value.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_value) {
    modal_value.style.display = "none";
  }
}

function btnAction(index){
    buttons_value[index].style.opacity = 1;
    for(var i=0; i < buttons_value.length; i++){
       if (i !=index){
        buttons_value[i].style.opacity = 0.5;
       }
    }
    buttons_value[index].style.opacity = 1;
    input_value.value = buttons_value[index].value;
    okValue.disabled = false
}

buttons_value[0].onclick = function(){
        btnAction(0)
    }

buttons_value[1].onclick = function(){
        btnAction(1)
    }
buttons_value[2].onclick = function(){
        btnAction(2)
    }
buttons_value[3].onclick = function(){
        btnAction(3)
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


