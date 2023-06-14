from django.http import HttpResponse, JsonResponse
from django.db import connection


def get_judges(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE role = 'Judge'")
            rows = cursor.fetchall()
            columns = [col[0] for col in cursor.description]  # Get the column names

        data = []
        for row in rows:
            data.append(dict(zip(columns, row)))  # Map column names to values for each row

        return JsonResponse(data, safe=False)
