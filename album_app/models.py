from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return self.user


class Album(models.Model):
    admin = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    participants = models.ManyToManyField(Profile)
    title = models.CharField(max_length=200)
    max_photos = models.IntegerField(default=0)

    def __str__(self):
        return self.title

    def images_selected(self):
        return self.images.filter(selected=True)


class Image(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images')
    width = models.IntegerField(default=0)
    height = models.IntegerField(default=0)
    photo = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    title = models.CharField(max_length=200)
    date_created = models.DateField(default=timezone.now)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['-date_created']


class Avatar(models.Model):
    name = models.CharField(max_length=100)
    album = models.ForeignKey(Album, default=1, on_delete=models.CASCADE, related_name='avatars')
    width = models.IntegerField(default=50)
    height = models.IntegerField(default=50)
    photo = models.ImageField(null=False, blank=False, width_field='width', height_field='height')
    activated = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Comment(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='comments')
    avatar = models.ForeignKey(Avatar, default=1, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.text


class Value(models.Model):
    grade = models.CharField(max_length=100)
    image = models.ForeignKey(Image, on_delete=models.CASCADE, related_name='grades')
    avatar = models.ForeignKey(Avatar, on_delete=models.CASCADE, related_name='grades')

    def __str__(self):
        return self.grade



# CREATE MY OWN USER MODEL. TO BE USED IN THE FUTURE

"""class UserManager(BaseUserManager):
    def create_user(self, email, password=None, is_active=True, is_staff=False, is_admin=False):
        if not email:
            raise ValueError('Users must have an email address')
        if not password:
            raise ValueError('Users must have passwords')
        user_obj = self.model(email=self.normalize_email(email))
        user_obj.set_password(password)
        user_obj.staff = is_staff
        user_obj.active = is_active
        user_obj.admin = is_admin
        user_obj.save(using=self._db)
        return user_obj

    def create_staff_user(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True
        )
        return user

    def create_admin_user(self, email, password=None):
        user = self.create_user(
            email,
            password=password,
            is_staff=True,
            is_admin=True
        )
        return user

class User(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True, null=True)
    active = models.BooleanField(default=True)  # can login
    staff = models.BooleanField(default=False)  # staff user non super user
    admin = models.BooleanField(default=False)  # super user

    USERNAME_FIELD = 'email' #username
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email

    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    @property
    def is_staff(self):
        return self.staff

    @property
    def is_admin(self):
        return self.admin

    @property
    def is_active(self):
        return self.active"""
