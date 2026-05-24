from app import app

app.app_context().push()

test_client = app.test_client()


def test_localities_crossroasds_roads_sings_200():
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
            'road_id': road_id,
            'latitude': 19.999,
            'longitude': 19.999,
            'image': open('src/app/recognition/img/1.jpg', 'rb'),
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 201

    road_sing_id = r.get_json()['id']

    r = test_client.post(
        '/crossroads',
        json={
            'type_crossroad': 'test',
        },
        content_type='application/json',
    )
    assert r.status_code == 201

    crossroad_id = r.get_json()['id']

    r = test_client.post(
        '/crossroads/roads/sings',
        data={
            'crossroad_id': crossroad_id,
            'road_sing_id': road_sing_id,
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 201

    crossroad_road_sing_id = r.get_json()['id']

    r = test_client.post(
        '/localities',
        json={
            'name_locality': 'test',
        },
        content_type='application/json',
    )
    assert r.status_code == 201

    locality_id = r.get_json()['id']

    r = test_client.post(
        '/localities/crossroads/roads/sings',
        data={
            'locality_id': locality_id,
            'road_sing_crossroad_id': crossroad_road_sing_id,
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 201

    locality_crossroad_road_sing_id = r.get_json()['id']

    r = test_client.get('/localities/crossroads/roads/sings')
    assert r.status_code == 200

    r = test_client.put(
        '/localities/crossroads/roads/sings',
        data={
            'locality_id': locality_id,
            'road_sing_crossroad_id': crossroad_road_sing_id,
        },
        query_string={
            'id': locality_crossroad_road_sing_id,
        },
        content_type='multipart/form-data',
    )
    assert r.status_code == 200

    r = test_client.delete(
        '/localities/crossroads/roads/sings',
        json='',
        content_type='application/json',
        query_string={'id': locality_crossroad_road_sing_id},
    )
    assert r.status_code == 204

    r = test_client.delete(
        '/localities',
        json='',
        content_type='application/json',
        query_string={'id': locality_id},
    )
    assert r.status_code == 204

    r = test_client.delete(
        '/crossroads/roads/sings',
        json='',
        content_type='application/json',
        query_string={'id': crossroad_road_sing_id},
    )
    assert r.status_code == 204

    r = test_client.delete(
        '/roads/sings',
        json='',
        content_type='application/json',
        query_string={'id': road_sing_id},
    )
    assert r.status_code == 204

    r = test_client.delete(
        '/crossroads',
        json='',
        content_type='application/json',
        query_string={'id': crossroad_id},
    )
    assert r.status_code == 204

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