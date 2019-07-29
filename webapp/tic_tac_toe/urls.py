from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('tic-tac-toe/', views.tic_tac_toe, name='tic-tac-toe'),
    path('tic-tac-toe/play/', views.tic_tac_toe_start, name='tic-tac-toe/play'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),

    # Tic Tac Toe URLs
    path('tic-tac-toe/play/<str:tile>',views.tic_tac_toe_play, name='tic-tac-toe/play'),
    path('tic-tac-toe/play/clean/', views.tic_tac_toe_play_clean, name='tic-tac-toe/clean'),
    path('tic-tac-toe/play/reset/', views.tic_tac_toe_play_reset, name='tic-tac-toe/reset'),
    path('tic-tac-toe/play/new-game/', views.tic_tac_toe_play_new_game, name='tic-tac-toe/new-game'),
]
