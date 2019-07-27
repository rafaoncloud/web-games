from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    return HttpResponse('Home')

def tic_tac_toe(request):
    return HttpResponse('Tic Tac Toe')

def about(request):
    return HttpResponse('About')

def contact(request):
    return HttpResponse('Contact')