from rest_framework.test import APIRequestFactory
from rest_framework import status
from rest_framework.test import APITestCase
from translatorApp.models import Phrase
from translatorApp.serializers import PhraseSerializer

class PhraseTests(APITestCase):
    def setUp(self):
        self.data = {
            'text': 'Bon jour'
        }
    def test_create_phrase(self):
        # should return 201 with translation
        response = self.client.post('/api/phrases/', self.data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data, {'translation': 'Hello'})
        self.assertEqual(Phrase.objects.count(), 1)
        self.assertEqual(Phrase.objects.get().text, 'Bon jour')

    def test_create_duplicate(self):
        # should return 200 with translation
        self.client.post('/api/phrases/', self.data, format='json')
        response = self.client.post('/api/phrases/', self.data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, {'translation': 'Hello'})

    def test_edge_empty(self):
        # should return 400 bad request
        response = self.client.post('/api/phrases/', {}, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data, None)
