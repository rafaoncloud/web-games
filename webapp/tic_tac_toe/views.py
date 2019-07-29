from django.shortcuts import render
from django.http import HttpResponse


# Create your views here.
def index(request):
    context = {}
    return render(request, 'index.html', context)


def tic_tac_toe(request):
    context = {}
    return render(request, 'tictactoe/main.html', context)


def tic_tac_toe_start(request):
    if request.method == 'POST':
        if 'single-player' in request.POST:
            return render(request, 'tictactoe/play.html', context={'game_type': 'Single Player'})
        elif 'multiplayer' in request.POST:
            return render(request, 'tictactoe/play.html', context={'game_type': 'Multiplayer'})
        elif 'online' in request.POST:
            return render(request, 'tictactoe/play.html', context={'game_type': 'Online'})


def tic_tac_toe_play(request, tile):
    if request.method != 'GET' and tile is None:
        return render(request, 'tictactoe/play.html', context={'game_type': 'Single Player'})

    tile = tile.split("=")[1] # Get only the value from the query parameter
    if not check_tile_validity(tile):
        return HttpResponse('The tile coordinate is not valid.')

    return HttpResponse('Not Implemented')


def tic_tac_toe_play_clean(request):
    context = {}
    return render(request, 'tictactoe/play.html', context)


def tic_tac_toe_play_reset(request):
    context = {}
    return render(request, 'tictactoe/play.html', context)


def tic_tac_toe_play_new_game(request):
    context = {}
    return render(request, 'tictactoe/main.html', context)

def snake(request):
    context = {}
    return render(request, 'snake/play.html', context)

def about(request):
    context = {}
    return render(request, 'about.html', context)


def contact(request):
    context = {}
    return render(request, 'contact.html', context)


def test(request):
    return HttpResponse('Test')


def check_tile_validity(tile_coords):
    """ Check whether the query parameter is valid or not
    as a valid input tile A1 ... C3 """
    if len(tile_coords) != 2:
        return False;

    row = tile_coords[1]
    col = tile_coords[0]

    if row != '1' and row != '2' and row != '3':
        return False;
    elif col != 'A' and col != 'B' and col != 'C':
        return False;

    return True;












