from django.db import models

class Phrase(models.Model):
	text = models.CharField(max_length=255)
	language = models.CharField(max_length=10)
	translation = models.CharField(max_length=255)

	def __str__(self):
		return self.text
