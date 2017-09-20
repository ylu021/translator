from django.test import TestCase
from translatorApp.models import Phrase
from django.db import IntegrityError

class PhraseModelTests(TestCase):
	def test_create_successfully_with_valid_data(self):
		Phrase.objects.create(text='salut', language='fr', translation='hello')
		phrase = Phrase.objects.get(text='salut')
		self.assertEqual(phrase.language, 'fr')

	#def test_create_duplicate_text(self):
	#	pass
	
	def test_create_fail_with_empty_data(self):
		try:
			Phrase.objects.create(language='fr')
		except IntegrityError:
			print("empty field detected")			
                
