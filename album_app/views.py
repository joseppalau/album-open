from django.shortcuts import render, get_object_or_404, redirect
from .models import Album, Image, Comment, Avatar
from django.contrib.auth.models import User
from django.utils import timezone
from django.contrib.auth.decorators import login_required


def pag_inici(request):
    return render(request, 'album_app/inici.html')

@login_required
def image_list(request):
    album = get_object_or_404(Album, client=request.user)
    all_images = album.images.all()
    images_selected = album.images.filter(selected=True)
    num_selected = len(images_selected)
    image_big = all_images[0]
    context = {'images': all_images, 'image_big': image_big, 'album': album, 'num_selected': num_selected, 'images_selected': images_selected,}
    return render(request, 'album_app/photo_list.html', context)


def photo_main_big(request, pk):
    image = get_object_or_404(Image, pk=pk)
    album = get_object_or_404(Album, client=request.user)
    all_images = album.images.all()
    images_selected = album.images.filter(selected=True)
    num_selected = len(images_selected)
    context = {'album': album, 'images': all_images, 'image_big': image,
               'num_selected': num_selected, 'images_selected': images_selected}
    return render(request, 'album_app/photo_list.html', context)


def add_delete_photo(request, pk):
    image = get_object_or_404(Image, pk=pk)
    if image.selected:
        image.selected = False
    else:
        image.selected = True
    image.save()

    if get_object_or_404(Image, pk=image.pk+1):
        num = image.pk + 1
    else:
        num = 1
    return redirect('photo_main_big', pk=num)


def album_big_page(request):
    album = get_object_or_404(Album, client=request.user)
    images_selected = album.images.filter(selected=True)
    context = {'images_selected': images_selected, 'album': album}
    return render(request, 'album_app/album_big_page.html', context)


def add_comment(request, pk):
    image = get_object_or_404(Image, pk=pk)

    if request.method == 'POST':
        avatar_id = request.POST.get('avatar')
        avatar = Avatar.objects.get(id=avatar_id)
        comment = Comment.objects.create(image=image, avatar=avatar, text=request.POST.get('comentari'), date=timezone.now())
        """comment.image = image
        comment.text = request.POST.get('comentari')
        comment.date = timezone.now()"""
        comment.save()
    return redirect('photo_main_big', pk=pk)

# Create your views here.
