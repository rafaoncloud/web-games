from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    context = {}
    return render(request, 'index.html', context)

def tic_tac_toe_start(request):
    context = {}
    if request.method == 'POST':
        if 'single-player' in request.POST:
            return render(request, 'tictactoe/play.html', context={'game_type':'Single Player'})
        elif 'multiplayer' in request.POST:
            return render(request, 'tictactoe/play.html',context={'game_type':'Multiplayer'})
        elif 'online' in request.POST:
            return render(request, 'tictactoe/play.html', context={'game_type': 'Online'})

    return render(request, 'tictactoe/main.html', context)

def about(request):
    context = {}
    return render(request, 'about.html', context)

def contact(request):
    context = {}
    return render(request, 'contact.html', context)

def test(request):
    return HttpResponse('Test')