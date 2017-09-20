from rest_framework import serializers
from .models import Phrase

class PhraseSerializer(serializers.ModelSerializer):
	class Meta:
		model = Phrase
		fields = '__all__'
		# field = ('id', 'text', 'language', 'translation')
