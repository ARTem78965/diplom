from app import app

app.app_context().push()

test_client = app.test_client()


def test_roads_sings_400():
    r = test_client.post(
        '/login',
        json={'login': 'admin', 'password': 'admin'},
        content_type='application/json',
    )
    assert r.status_code == 200

    user_id = r.get_json()['id']

    r = test_client.post(
        '/roads',
        json={'number_road': 'test', 'name_road': 'test'},
        content_type='application/json',
    )
    assert r.status_code == 201

    road_id = r.get_json()['id']

    r = test_client.post(
        '/roads/sings',
        data={
            'road_id': str(road_id),
            'latitude': 19.999,
            'longitude': 19.999,
            'image': '1.jpg',
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 400

    r = test_client.put(
        '/roads/sings',
        data={
            'road_id': str(road_id),
            'latitude': 29.999,
            'longitude': 29.999,
            'image': '2.jpg',
        },
        query_string={
            'id': str(road_id),
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 400

    r = test_client.delete(
        '/roads',
        json='',
        content_type='application/json',
        query_string={'id': road_id},
    )
    assert r.status_code == 204

    r = test_client.post(
        '/logout',
        json={'id': user_id},
        content_type='application/json',
    )
    assert r.status_code == 200
    assert r.get_json()['message'] == 'Logout successful'