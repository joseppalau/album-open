from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing_page, name="landing_page"),
    path('user-register/', views.user_register, name='user_register'),
    path('user-site/', views.user_site, name='user_site'),
    path('album-user/', views.image_list, name='photo_list'),
    path('big_image/', views.photo_main_big, name='photo_main_big'),
    path('album/', views.add_delete_photo, name='add_delete_photo'),
    path('album_big_page/', views.album_big_page, name='album_big_page'),
    path('add_comment/', views.add_comment, name='add_comment'),
    path('add_photo_value/', views.add_photo_value, name='add_photo_value'),
]