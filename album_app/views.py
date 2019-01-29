from django.shortcuts import render
from .models import Album
from django.contrib.auth.decorators import login_required


def pag_inici(request):
    return render(request, 'album_app/inici.html')

@login_required
def image_list(request):
    album = Album.objects.get(client=request.user)
    query = album.images.all()
    content = {'images': query}
    return render(request, 'album_app/photo_list.html', content)


# Create your views here.
