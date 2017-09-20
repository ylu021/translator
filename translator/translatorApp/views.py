from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets
from .serializers import PhraseSerializer
from .models import Phrase

class PhraseViewSet(viewsets.ModelViewSet):
	serializer_class = PhraseSerializer
	queryset = Phrase.objects.all()

	def create(self, request):
		pass


