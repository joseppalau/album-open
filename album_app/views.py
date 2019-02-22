from django.shortcuts import render, get_object_or_404, redirect
from .models import Album, Image, Comment, Avatar, Value
from django.http import HttpResponse
from django.http import JsonResponse
from django.utils import timezone
from datetime import datetime
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
    img_status = ''
    image_big = all_images[0]
    if image_big.selected:
        img_status = 'true'
    else:
        img_status = 'false'
    comments = image_big.comments.all().order_by('-date')
    values = Value.objects.filter(image=image_big)
    context = {'images': all_images, 'image_big': image_big, 'album': album, 'num_selected': num_selected,
               'images_selected': images_selected, 'values': values,'comments': comments, 'img_status': img_status}
    return render(request, 'album_app/photo_list.html', context)

#main photo changes with ajax
def photo_main_big(request):
    if request.method == 'POST':
        image_id = request.POST.get('imageId')
        image = get_object_or_404(Image, id=image_id)
        values = Value.objects.filter(image=image)
        values_id = [value.id for value in values]
        avatars_photo_url = [value.avatar.photo.url for value in values]
        text_grades = [value.grade for value in values]
        comments = image.comments.all().order_by('-date')
        print('comments length', len(comments))
        avatars_photo_url_c = [comment.avatar.photo.url for comment in comments]
        text_comments = [comment.text for comment in comments]
        dates = [comment.date.strftime('%d / %b / %y') for comment in comments]

        json_response = {'imageURL': image.photo.url, 'values_id': values_id, 'avatars_photo_url': avatars_photo_url,
                         'text_grades': text_grades, 'avatars_photo_url_c': avatars_photo_url_c,
                         'text_comments': text_comments, 'dates': dates, 'img_selected': image.selected}
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")



def add_delete_photo(request):
    if request.method == 'POST':
        image = get_object_or_404(Image, id=request.POST.get('img_id'))
        album = get_object_or_404(Album, client=request.user)
        if image.selected:
            image.selected = False
        else:
            image.selected = True
        image.save()
        totalImages = len(album.images.all())
        imagesInAlbum = len(album.images.filter(selected=True))
        print(imagesInAlbum)
        json_response = {'image_selected': image.selected, 'imagesInAlbum': imagesInAlbum, 'totalImages': totalImages}
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")


def album_big_page(request):
    album = get_object_or_404(Album, client=request.user)
    images_selected = album.images.filter(selected=True)
    context = {'images_selected': images_selected, 'album': album}
    return render(request, 'album_app/album_big_page.html', context)

#add commentns with ajax
def add_comment(request):
    if request.method == 'POST':
        img_id = request.POST.get('imageId')
        avatar_id = request.POST.get('avatarInput')
        avatar = Avatar.objects.get(id=avatar_id)
        print(avatar.photo.url)
        image = Image.objects.get(id=img_id)
        comment = Comment.objects.create(image=image, avatar=avatar, text=request.POST.get('text_comment'), date=timezone.now())
        comment.save()
        json_response = {'avatarImage': avatar.photo.url, 'comment': comment.text,
                         'comment_id': comment.id, 'date': timezone.now().strftime('%d / %b / %y')}
        return HttpResponse(json.dumps(json_response), content_type='application/json')
    else:
        return HttpResponse(json.dumps({"nothing to see": "this is happening"}), content_type="application/json")


#add photos with ajax
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
