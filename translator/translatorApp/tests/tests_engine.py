from translatorApp.engine.trans import Googletrans
from django.test import TestCase

class TransEngineTests(TestCase):
    def setUp(self):
        self.emptyphrase = ''
        self.phrase = 'Bon jour'
        self.translator = Googletrans()

    def test_detect_french(self):
        self.assertEqual(self.translator.detect(self.phrase), 'fr')

    def test_empty_input(self):
        self.assertEqual(self.translator.translate_to_english(self.emptyphrase, 'fr'), '')

    def test_translate_input(self):
        translation = self.translator.translate_to_english(self.phrase, 'fr')
        self.assertEqual(translation, "Hello")
