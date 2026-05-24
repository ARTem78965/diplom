from app import app

app.app_context().push()

test_client = app.test_client()


def test_user_200():
    r = test_client.post(
        '/login',
        json={'login': 'admin', 'password': 'admin'},
        content_type='application/json',
    )
    assert r.status_code == 200

    user_id = r.get_json()['id']

    r = test_client.post(
        '/users',
        data={
            'name': 'test',
            'login': 'test',
            'password': 'test',
            'privilege_id': 2,
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 201

    new_user_id = r.get_json()['id']

    r = test_client.get('/users')
    assert r.status_code == 200

    r = test_client.put(
        '/users',
        data={
            'name': 'test_1',
            'login': 'test_1',
            'password': 'test_1',
            'privilege_id': 2,
        },
        content_type='multipart/form-data',
        query_string={'id': new_user_id},
    )
    assert r.status_code == 200

    r = test_client.delete(
        '/users',
        json='',
        content_type='application/json',
        query_string={'id': new_user_id},
    )
    assert r.status_code == 204

    r = test_client.post(
        '/logout',
        json={'id': user_id},
        content_type='application/json',
    )
    assert r.status_code == 200
    assert r.get_json()['message'] == 'Logout successful'