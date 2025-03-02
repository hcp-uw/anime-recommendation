from django.core import management

from anime_recommendations import celery_app


@celery_app.task
def clearsessions():
    management.call_command("clearsessions")
