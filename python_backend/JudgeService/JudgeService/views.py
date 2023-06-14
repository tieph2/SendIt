from django.http import HttpResponse, JsonResponse
from django.db import connection


def get_judges (request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users")
            row = cursor.fetchall()

        return JsonResponse(row, safe=False)
