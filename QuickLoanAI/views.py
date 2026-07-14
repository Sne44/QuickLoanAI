from django.http import HttpResponse


def home(request):
    return HttpResponse("""
    <h1>🚀 QuickLoanAI Backend</h1>

    <h3>Backend is running successfully.</h3>

    <hr>

    <h3>Available URLs</h3>

    <ul>
        <li><a href="/admin/">Django Admin</a></li>
        <li><a href="/api/token/">JWT Authentication</a></li>
        <li><a href="/api/loans/">Loan APIs</a></li>
    </ul>

    <hr>

    <p>Frontend is running at:</p>

    <a href="http://localhost:3000">
        http://localhost:3000
    </a>
    """)