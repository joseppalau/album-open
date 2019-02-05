var num_selected = document.getElementById("num_selected").value
var max_photos = document.getElementById("max_photos").value

Number(num_selected)
Number(max_photos)

var albumBar = document.getElementById("album-bar");
var ctx = albumBar.getContext("2d");
ctx.fillStyle = 'blue';
var coverX = albumBar.width / max_photos * num_selected;
ctx.fillRect(0,0,coverX,albumBar.height);

console.log(num_selected)