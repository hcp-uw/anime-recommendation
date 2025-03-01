from django.core import management

from anime-recommendation import celery_app


@celery_app.task
def clearsessions():
    management.call_command("clearsessions")
