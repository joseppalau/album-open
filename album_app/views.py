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
    values = Value.objects.filter(image=image_big)
    context = {'images': all_images, 'image_big': image_big, 'album': album, 'num_selected': num_selected, 'images_selected': images_selected, 'values': values}
    return render(request, 'album_app/photo_list.html', context)


def photo_main_big(request):
    if request.method == 'POST':
        imageId = request.POST.get('imageId')
        image = Image.objects.get(id=imageId)
        comments = Comment.objects.filter(image=image)
        values = Value.objects.filter(image=image)
        json_response = {'imageURL': image.photo.url}
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")



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
            image_id = request.POST.get('imageValueId')
            avatar_id = request.POST.get('avatarValueId')
            image = Image.objects.get(id=image_id)
            avatar = Avatar.objects.get(id=avatar_id)
            value_exist = False
            if len(Value.objects.filter(image=image, avatar=avatar)) > 0:
                value_exist = True
                value = Value.objects.get(image=image, avatar=avatar)
                value.grade = value_text
                value.save()
                print(value_exist)
            else:
                value = Value.objects.create(grade=value_text, image=image, avatar=avatar)
                value.save()
                print(value_exist)
            json_response = {'valueGrade': value.grade, 'valueId': value.id, 'avatarId': avatar_id, 'avatarPhoto': avatar.photo.url, 'valueExist': value_exist}
            return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")




# Create your views here.
