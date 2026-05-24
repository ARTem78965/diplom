from app import app

app.app_context().push()

test_client = app.test_client()


def test_type_crossroad_200():
    r = test_client.post(
        '/login',
        json={'login': 'admin', 'password': 'admin'},
        content_type='application/json',
    )
    assert r.status_code == 200

    user_id = r.get_json()['id']

    r = test_client.post(
        '/crossroads',
        json={
            'type_crossroad': 'test',
        },
        content_type='application/json',
    )
    assert r.status_code == 201

    type_crossroad_id = r.get_json()['id']

    r = test_client.get('/crossroads')
    assert r.status_code == 200

    r = test_client.put(
        '/crossroads',
        json={
            'type_crossroad': 'test_1',
        },
        content_type='application/json',
        query_string={'id': type_crossroad_id},
    )
    assert r.status_code == 200

    r = test_client.delete(
        '/crossroads',
        json='',
        content_type='application/json',
        query_string={'id': type_crossroad_id},
    )
    assert r.status_code == 204

    r = test_client.get(
        '/crossroad',
        query_string={'id': type_crossroad_id},
    )
    assert r.status_code == 404

    r = test_client.post(
        '/logout',
        json={'id': user_id},
        content_type='application/json',
    )
    assert r.status_code == 200
    assert r.get_json()['message'] == 'Logout successful'