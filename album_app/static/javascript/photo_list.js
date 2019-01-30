function selectImg(img){
   img_border = img.style.border;
   if(img_border == '5px solid grey'){
        img.style.border = null;
   } else{
        img.style.border = '5px solid grey';
   }
}


