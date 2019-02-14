from django.shortcuts import render, get_object_or_404, redirect
from .models import Album, Image, Comment, Avatar, Value
from django.http import HttpResponse
from django.http import JsonResponse
from django.utils import timezone
from django.contrib.auth.decorators import login_required
import json
from django.views.decorators.csrf import ensure_csrf_cookie


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
    comments = image.comments.order_by('-date')
    context = {'album': album, 'images': all_images, 'image_big': image,
               'num_selected': num_selected, 'images_selected': images_selected, 'comments': comments}
    return render(request, 'album_app/photo_list.html', context)


def add_delete_photo(request, pk):
    image = get_object_or_404(Image, pk=pk)
    album = get_object_or_404(Album, client=request.user)
    if image.selected:
        image.selected = False
    else:
        image.selected = True
    image.save()
    num = album.images.all()[0].pk
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
        comment.save()
    return redirect('photo_main_big', pk=pk)


def add_photo_value(request):
    if request.method == 'POST':
            value_text = request.POST.get('valueText')
            print(value_text)
            image_id = request.POST.get('imageValueId')
            print(image_id)
            avatar_id = request.POST.get('avatarValueId')
            print(avatar_id)
            image = Image.objects.get(id=image_id)
            avatar = Avatar.objects.get(id=avatar_id)
            value = Value.objects.create(grade=value_text, image=image, avatar=avatar)
            value.save()
            json_response = {'message': 'nothing to send'}
            return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")




# Create your views here.
