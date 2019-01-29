from django.shortcuts import render
from .models import Image

def pag_inici(request):
    return render(request, 'album_app/inici.html')


def image_list(request):
    query = Image.objects.all()
    content = {'images': query}
    return render(request, 'album_app/photo_list.html', content)






# Create your views here.
