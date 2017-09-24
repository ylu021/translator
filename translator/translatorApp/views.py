from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import F
from rest_framework import viewsets, status
from .serializers import PhraseSerializer
from rest_framework.response import Response
from rest_framework.decorators import detail_route, list_route
from .models import Phrase
from .engine.trans import Googletrans

class PhraseViewSet(viewsets.ModelViewSet):
	serializer_class = PhraseSerializer
	queryset = Phrase.objects.all()
	g = Googletrans()

	# when pressing submit
	def create(self, request):
		if request.method == 'POST' and 'text' in request.data.keys():
			data = {
				'text': request.data['text']
			}
			translation = None
			try:
				# phrase exist retrieve the translation
				phrase = self.queryset.get(text=request.data['text'])
				translation = phrase.translation
				return Response({'text': phrase.text, 'language': phrase.language, 'translation': translation}, status=status.HTTP_200_OK)

			except Phrase.DoesNotExist:
				# phrase does not exist
				data['language'] = self.g.detect(request.data['text'])
				data['translation'] = self.g.translate_to_english(request.data['text'], data['language'])
				translation = data['translation']
				serializer = PhraseSerializer(data=data)
				if serializer.is_valid():
					serializer.save()
					return Response({'text': request.data['text'], 'language': data['language'],'translation': translation}, status=status.HTTP_201_CREATED)

				return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
		# bad request
		return Response(status=status.HTTP_400_BAD_REQUEST)
