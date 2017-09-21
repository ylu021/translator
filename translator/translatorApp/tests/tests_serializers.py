from django.test import TestCase
from translatorApp.models import Phrase
from translatorApp.serializers import PhraseSerializer

class SerializerTestCase(TestCase):
	def setUp(self):
		self.dummy_phrase = {
			'text': 'salut',
			'language': 'fr',
			'translation': 'hello'
		}

		self.dummy_phrase_empty = {
			'language': 'fr'
		}

		self.phrase = Phrase.objects.create(**self.dummy_phrase)
		self.serializer = PhraseSerializer(instance=self.phrase)

	def test_valid_data_fields(self):
		data = self.serializer.data
		self.assertCountEqual(data.keys(), ['id', 'text', 'language', 'translation'])

	def test_text_content(self):
		data = self.serializer.data
		self.assertEqual(data['text'], self.dummy_phrase['text'])

	def test_language_content(self):
		data = self.serializer.data
		self.assertEqual(data['language'], self.dummy_phrase['language'])

	def test_translation_content(self):
		data = self.serializer.data
		self.assertEqual(data['translation'], self.dummy_phrase['translation'])

	def test_edge_empty_content(self):
		serializer = PhraseSerializer(data=self.dummy_phrase_empty)
		self.assertFalse(serializer.is_valid())
