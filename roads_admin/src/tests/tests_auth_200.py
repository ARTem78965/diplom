from app import app

app.app_context().push()

test_client = app.test_client()


def test_login_logout_200():
    r = test_client.post(
        '/login',
        json={'login': 'admin', 'password': 'admin'},
        content_type='application/json',
    )
    
    assert r.status_code == 200

    user_id = r.get_json()['id']

    r = test_client.post(
        '/logout',
        json={'id': user_id},
        content_type='application/json',
    )

    assert r.status_code == 200
    assert r.get_json()['message'] == 'Logout successful'