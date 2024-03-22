from django.http import JsonResponse
from django.db import connection


def get_judges(request):
    if request.method == 'GET':
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM users WHERE role = 'Judge'")
            rows = cursor.fetchall()
            # Get the column names
            columns = [col[0] for col in cursor.description]

        data = []
        for row in rows:
            # Map column names to values for each row
            data.append(dict(zip(columns, row)))

        return JsonResponse(data, safe=False)
