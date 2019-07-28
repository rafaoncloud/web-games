from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tic-tac-toe/',views.tic_tac_toe_start, name='tic-tac-toe'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
]