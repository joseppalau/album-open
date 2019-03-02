var selected = document.getElementById('btnToAlbum')
var current_imgId = $('#bigImageValueId').val();
console.log(selected.value)
console.log(current_imgId)

if (selected.value == 'true'){
    selected.innerHTML = 'Treu-la'
    selected.style.backgroundColor = 'grey'
} else{
    selected.innerHTML = 'Afegeix-la'
    selected.style.backgroundColor = 'green'
}

$('#btnToAlbum').on('click', function(event){
    event.preventDefault()
    album_connect()
})

function album_connect(){
    $.ajax({
        type: 'POST',
        url: '/photo_list/album/',
        data: {'img_id': current_imgId},
        success: function(json){
            console.log('selected?:' + json.image_selected)
            console.log('images in album: ' + json.imagesInAlbum)
            if (json.image_selected == true ){
                selected.innerHTML = 'Treu-la'
                selected.style.backgroundColor = 'grey'
            } else {
                selected.innerHTML = 'Afegeix-la'
                selected.style.backgroundColor = 'green'
            }
            $('#barText').html(json.imagesInAlbum + ' fotus de ' + json.totalImages)

        } ,
        error: function(xhr,errmsg,err){
            console.log(status.xhr + ": " + xhr.responseText);
            }
    })
}

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
  reset_avatars(avatarsClass='avatar-class', buttonId='btn-comment');
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

// AJAX BUTTONS FOR ALBUM


//APPLY AJAX FOR COMMENTS AND VALUES WHEN BIG IMAGE CHANGES

function big_click(img){
    current_imgId = img.id
    console.log('form submitted!');
    console.log('id to ajax:' + img.id);
    $('#bigImageValueId').val(img.id);
    $('#container-values').empty();
    $('#comments-listId').empty()
    process_image(img.id);
    };

function process_image(id) {
        $.ajax({
        url: '/photo_list/big_image/',
        type: 'POST',
        data: {'imageId': id},
        success: function(json) {
            console.log(json.imageURL);
            console.log(json.img_selected)
            $('#image-big').attr({
                src: json.imageURL,
            });
            if (json.img_selected == true){
                selected.innerHTML = 'Treu-la'
                selected.style.background = 'grey'
            } else{
                selected.innerHTML = 'Afegeix-la'
                selected.style.background = 'green'
            }
            //values
            if (json.values_id.length > 0) {
                console.log('values div empty')
                console.log(json.values_id.length)
                var divParent = document.getElementById('container-values')
                for (var i = 0; i < json.values_id.length; i++) {
                    var newDiv = document.createElement('div')
                    divParent.appendChild(newDiv)
                    console.log('new div created')
                    newDiv.id = 'values-'+json.values_id[i]
                    var newImg = document.createElement('img')
                    newImg.id = 'img'+json.values_id[i]
                    newImg.src = json.avatars_photo_url[i]
                    newImg.width = 60
                    newImg.height = 60
                    newDiv.appendChild(newImg)
                    var newP = document.createElement('p')
                    newP.innerHTML = '<strong>'+json.text_grades[i]+'</strong>'
                    newDiv.appendChild(newP)
                }
            } else{
                $('#container-values').append('<p id="no-valuesId">No values</p>')
            }
            //comments
            if (json.text_comments.length > 0 ) {
                var divComments = document.getElementById('comments-listId')
                for (var i = 0; i < json.text_comments.length; i++) {
                    var newDiv = document.createElement('div')
                    divComments.appendChild(newDiv)
                    newDiv.className = 'comments-list-content'
                    var newDivImg = document.createElement('div')
                    newDiv.appendChild(newDivImg)
                    newDivImg.className = 'img-comment'
                    var newImg = document.createElement('img')
                    newImg.src = json.avatars_photo_url_c[i]
                    newImg.width = 50
                    newImg.height = 50
                    newDivImg.appendChild(newImg)
                    var newDivP = document.createElement('div')
                    newDivP.className = 'text-comment'
                    newDiv.appendChild(newDivP)
                    var newSpan = document.createElement('span')
                    var t = document.createTextNode(json.dates[i])
                    newSpan.appendChild(t)
                    newDivP.appendChild(newSpan)
                    var newP = document.createElement('p')
                    newP.innerHTML = json.text_comments[i]
                    newDivP.appendChild(newP)
                }
            } else {
                $('#comments-listId').append('<p id="no-commentsId">No comments</p>')
            }
        },
        error: function(xhr,errmsg,err){
            console.log(status.xhr + ": " + xhr.responseText);
            }
        });
    }


//Avatars
var count_avatars = 0
function choose_avatar(avatar_img){
    for (var i = 0; i < buttons_value.length; i++){
        buttons_value[i].disabled = false
    }
    count_avatars += 1;
    if (count_avatars > 0){
        btn = document.getElementById('btn-comment');
        btn.disabled = false;
        btn.style.opacity = 1;
    }
    avatar_img.style.border = '1px solid green';
    var avatar = document.getElementById("avatarInput");
    var avatar_value = document.getElementById("avatarInput_value");
    avatar.value = avatar_img.id; //refers to avatar in comments
    avatar_value.value = avatar_img.id; // refers to avatar in image value

    var avatars = document.getElementsByClassName('avatar-class');
    for (var i=0; i < avatars.length; i++){
        avatars[i].style.opacity = 0.5;
    }
    avatar_img.style.opacity = 1;
}

function reset_avatars(avatarsClass, buttonId){
    var avatars = document.getElementsByClassName(avatarsClass);
    btn = document.getElementById(buttonId)
    for (var i=0; i < avatars.length; i++){
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
  reset_avatars(avatarsClass='avatar-class', buttonId='okValue')
    for (var i = 0; i < buttons_value.length; i++){
        buttons_value[i].disabled = true
    }
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

// comments request for creating comments
$('#comment-form').on('submit', function(event){
    event.preventDefault();
    console.log('comment form submitted');
    $('#modalComment').hide();
    $('#no-commentsId').empty();

    create_comment();
    });

function create_comment(){
    $.ajax({
        url:'/photo_list/add_comment/',
        type:'POST',
        data:{'imageId': current_imgId , 'avatarInput': $('#avatarInput').val(),'text_comment': $('#textComment').val()},
        success: function(json){
            var container = document.getElementById('comments-listId')
            var divComment = document.createElement('div')
            divComment.className = 'comments-list-content'
            divComment.id = 'comment-'+json.comment_id
            container.insertBefore(divComment, container.firstChild)
            var divImg = document.createElement('div')
            divImg.className = 'img-comment'
            divImg.id = 'img-'+json.comment_id
            divComment.appendChild(divImg)
            var img = document.createElement('img')
            img.src = json.avatarImage
            img.width = 50
            img.height = 50
            divImg.appendChild(img)
            var divText = document.createElement('div')
            divText.className = 'text-comment'
            divComment.appendChild(divText)
            var newSpan = document.createElement('span')
            var t = document.createTextNode(json.date)
            newSpan.appendChild(t)
            divText.appendChild(newSpan)
            var newP = document.createElement('p')
            newP.innerHTML= json.comment
            divText.appendChild(newP)
        },
        error: function(xhr,errmsg,err){
            console.log(status.xhr + ": " + xhr.responseText);
            }
    })
}


// Ajax request for creating or changing values
$('#value-form').on('submit', function(event){
     for (var i = 0; i < buttons_value.length; i++){
        buttons_value[i].disabled = false
    }
    event.preventDefault();
    console.log('form submitted!');
    $('#modal-value').hide()
    $('#no-valuesId').empty()
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
            console.log(json.valueGrade+" "+ json.avatarId+" "+json.avatarPhoto+" "+json.valueExist)
            if (json.valueExist == true) {
               console.log('avatar ja ha avaluat')
               console.log(json.valueExist)
               $('#img'+json.valueId).attr("src", json.avatarPhoto)
               $('#p'+json.valueId).html('<strong>'+ json.valueGrade +'</strong>');
            }
            else {
            console.log('mostrarà nova avaluació')
            console.log(json.valueExist)
            $('#container-values').append('<div><img id="img'+json.valueId+'"src="'+json.avatarPhoto+'"><p id=p"'+json.valueId+'"><strong>'+json.valueGrade+'</strong></p></div>')

            }
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
