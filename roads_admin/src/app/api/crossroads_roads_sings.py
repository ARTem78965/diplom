from flask import abort
from flask import request

from app.extensions import db
from app.models import Road
from app.models import RoadSing
from app.models import Sing
from app.models import Crossroad
from app.models import RoadSingCrossroad
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_roads_sings_crossroads():
    roads_sings_crossroads_from_db = (
        RoadSingCrossroad.query
        .join(Crossroad, Crossroad.id == RoadSingCrossroad.crossroad_id)
        .join(RoadSing, RoadSing.id == RoadSingCrossroad.road_sing_id)
        .join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSingCrossroad.id,
            Crossroad.type_crossroad,
            Road.number_road,
            Road.name_road,
            RoadSing.sing_id,
            Sing.name_sing,
            RoadSing.latitude,
            RoadSing.longitude,
            RoadSing.image,
            RoadSing.state,
            RoadSing.comment,
        )
    )

    items = [
        {
            'id': data.id,
            'type_crossroad': data.type_crossroad,
            'roads': {
                'number_road': data.number_road,
                'name_road': data.name_road,
                'sings': {
                    'sing_id': data.sing_id,
                    'name_sing': data.name_sing,
                    'latitude': data.latitude,
                    'longitude': data.longitude,
                    'image': data.image,
                    'state': data.state,
                },
            },
        }
        for data in roads_sings_crossroads_from_db
    ]

    return {'items': items}


@user_authenticated
def get_road_sing_crossroad():
    id = request.args['id']

    crossroad_road_sing_from_db = RoadSingCrossroad.query.filter_by(id=id).first_or_404()
    crossroad_road_sing = {        
        'id': crossroad_road_sing_from_db.id,
        'road_sing_id': crossroad_road_sing_from_db.road_sing_id,
        'crossroad_id': crossroad_road_sing_from_db.crossroad_id,
    }

    return {'items': crossroad_road_sing}


@user_authenticated
def create_road_sing_crossroad():
    road_sing_id = request.form['road_sing_id']
    crossroad_id = request.form['crossroad_id']

    crossroads_from_db = Crossroad.query.filter_by(id=crossroad_id).one_or_none()
    roads_sings_from_db = RoadSing.query.filter_by(id=road_sing_id).one_or_none()

    new_road_sing_crossroad = RoadSingCrossroad(
        road_sing_id=road_sing_id,
        crossroad_id=crossroad_id,
    )
    db.session.add(new_road_sing_crossroad)
    db.session.commit()

    roads_sings_crossroads_from_db = (
        RoadSingCrossroad.query
        .join(Crossroad, Crossroad.id == RoadSingCrossroad.crossroad_id)
        .join(RoadSing, RoadSing.id == RoadSingCrossroad.road_sing_id)
        .join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSingCrossroad.id,
            Crossroad.type_crossroad,
            Road.number_road,
            Road.name_road,
            RoadSing.sing_id,
            Sing.name_sing,
            RoadSing.latitude,
            RoadSing.longitude,
            RoadSing.image,
            RoadSing.state,
            RoadSing.comment,
        )
    ).first()

    return {
            'id': roads_sings_crossroads_from_db.id,
            'type_crossroad': roads_sings_crossroads_from_db.type_crossroad,
            'roads': {
                'number_road': roads_sings_crossroads_from_db.number_road,
                'name_road': roads_sings_crossroads_from_db.name_road,
                'sings': {
                    'sing_id': roads_sings_crossroads_from_db.sing_id,
                    'name_sing': roads_sings_crossroads_from_db.name_sing,
                    'latitude': roads_sings_crossroads_from_db.latitude,
                    'longitude': roads_sings_crossroads_from_db.longitude,
                    'image': roads_sings_crossroads_from_db.image,
                    'state': roads_sings_crossroads_from_db.state,
                    'comment': roads_sings_crossroads_from_db.comment,
                },
            },
    }, 201


@user_authenticated
def update_road_sing_crossroad():
    id = request.args['id']
    road_sing_id = request.form['road_sing_id']
    crossroad_id = request.form['crossroad_id']

    roads_sings_crossroads_from_db = RoadSingCrossroad.query.filter_by(id=id).first_or_404()
    crossroads_from_db = Crossroad.query.filter_by(id=crossroad_id).one_or_none()
    roads_sings_from_db = RoadSing.query.filter_by(id=road_sing_id).one_or_none()

    db.session.query(RoadSingCrossroad).filter(RoadSingCrossroad.id == roads_sings_crossroads_from_db.id).update(
        {
            'road_sing_id': road_sing_id,
            'crossroad_id': crossroad_id,
        }
    )
    db.session.commit()

    roads_sings_crossroads_from_db = (
        RoadSingCrossroad.query
        .join(Crossroad, Crossroad.id == RoadSingCrossroad.crossroad_id)
        .join(RoadSing, RoadSing.id == RoadSingCrossroad.road_sing_id)
        .join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSingCrossroad.id,
            Crossroad.type_crossroad,
            Road.number_road,
            Road.name_road,
            RoadSing.sing_id,
            Sing.name_sing,
            RoadSing.latitude,
            RoadSing.longitude,
            RoadSing.image,
            RoadSing.state,
            RoadSing.comment,
        )
    ).first()

    item = {
        'id': roads_sings_crossroads_from_db.id,
        'type_crossroad': roads_sings_crossroads_from_db.type_crossroad,
        'roads': {
            'number_road': roads_sings_crossroads_from_db.number_road,
            'name_road': roads_sings_crossroads_from_db.name_road,
            'sings': {
                'sing_id': roads_sings_crossroads_from_db.sing_id,
                'name_sing': roads_sings_crossroads_from_db.name_sing,
                'latitude': roads_sings_crossroads_from_db.latitude,
                'longitude': roads_sings_crossroads_from_db.longitude,
                'image': roads_sings_crossroads_from_db.image,
                'state': roads_sings_crossroads_from_db.state,
            },
        },
    }

    return {'items': item}


@user_authenticated
def delete_road_sing_crossroad():
    id = request.args['id']

    roads_sings_crossroads_from_db = RoadSingCrossroad.query.filter_by(id=id).first_or_404()

    db.session.query(RoadSingCrossroad).filter(RoadSingCrossroad.id == roads_sings_crossroads_from_db.id).delete()
    db.session.commit()

    return '', 204
