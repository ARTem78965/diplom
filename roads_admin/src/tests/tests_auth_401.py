from app import app

app.app_context().push()

test_client = app.test_client()


def test_login_invalid_credentials():
    r = test_client.post(
        '/login',
        json={'login': 'test_user', 'password': 'wrong_pass'},
        content_type='application/json',
    )

    assert r.status_code == 401
    assert r.get_json()['message'] == 'Invalid login or password'


def test_sing_401():
    r = test_client.get('/sings')
    
    assert r.status_code == 401