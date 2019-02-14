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
  reset_avatars(avatarsClass='avatar-class', buttonId='btn-comment')
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
    avatar_value = document.getElementById("avatarInput_value");
    avatar.value = avatar_img.id; //refers to avatar in comments
    avatar_value.value = avatar_img.id; // refers to avatar in image value

    avatars = document.getElementsByClassName('avatar-class');
    for (i=0; i < avatars.length; i++){
        avatars[i].style.opacity = 0.5;
    }
    avatar_img.style.opacity = 1;
}

function reset_avatars(avatarsClass, buttonId){
    avatars = document.getElementsByClassName(avatarsClass);
    btn = document.getElementById(buttonId)
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
  reset_avatars(avatarsClass='avatar-class', buttonId='okValue')
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal_value) {
    modal_value.style.display = "none";
  }
}
//when the user click on ok (submit), the modal is closed
ok_value_btn = document.getElementById('okValue')

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

// Ajax request
$('#value-form').on('submit', function(event){
    event.preventDefault();
    console.log('form submitted!');
    $('#modal-value').hide()
    create_value();
});

function create_value(){
    console.log('create value is working!')
    console.log($('#valueInput').val(), $('#bigImageValueId').val(), $('#avatarInput_value').val())
    $.ajax({
        url: '/photo_list/add_photo_value/',
        type: 'POST',
        data: {'valueText': $('#valueInput').val(), 'imageValueId': $('#bigImageValueId').val() , 'avatarValueId': $('#avatarInput_value').val()},
        success: function(json){
            console.log(json.valueGrade)
            console.log('success')
            },
        error: function(xhr,errmsg,err){
            console.log(status.xhr + ": " + xhr.responseText);
            }
    });
};

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
  //var dots = document.getElementsByClassName("demo");
  //var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  /*for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }*/
  slides[slideIndex-1].style.display = "block";
  //dots[slideIndex-1].className += " active";
  //captionText.innerHTML = dots[slideIndex-1].alt;
}


//CSRF-TOKEN CODE FOR AJAX
$(function() {

    // This function gets cookie with a given name
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    /*
    The functions below will create a header with csrftoken
    */

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }
    function sameOrigin(url) {
        // test that a given url is a same-origin URL
        // url could be relative or scheme relative or absolute
        var host = document.location.host; // host + port
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        // Allow absolute or scheme relative URLs to same origin
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                // Send the token to same-origin, relative URLs only.
                // Send the token only if the method warrants CSRF protection
                // Using the CSRFToken value acquired earlier
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });

});
