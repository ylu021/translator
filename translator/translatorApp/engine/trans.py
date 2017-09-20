from googletrans import Translator

class Googletrans:
    def __init__(self):
        self.translator = Translator()

    def detect(self, phrase):
        return self.translator.detect(phrase).lang

    def translate_to_english(self, phrase, source):
        return self.translator.translate(phrase, src=source).text

# def main():
#     g = Googletrans()
#     print(g.detect(''))
#     print(g.translate_to_english('Bon jour', 'fr'))
