from django.urls import path
from . import views

urlpatterns = [
    path('', views.pag_inici, name='inici'),
    path('photo_list/', views.image_list, name='photo_list'),
    path('photo_list/big_image/', views.photo_main_big, name='photo_main_big'),
    path('photo_list/album/<int:pk>/', views.add_delete_photo, name='add_delete_photo'),
    path('photo_list/album_big_page/', views.album_big_page, name='album_big_page'),
    path('photo_list/add_comment/', views.add_comment, name='add_comment'),
    path('photo_list/add_photo_value/', views.add_photo_value, name='add_photo_value'),
]