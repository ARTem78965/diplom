from flask import abort
from flask import request

from app.extensions import db
from app.models import Road
from app.models import RoadSing
from app.models import RoadSingCrossroad
from app.models import Sing
from app.models import Crossroad
from app.models import LocalityCrossroad
from app.models import Locality
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_localities_crossroads():
    localities_crossroads_from_db = (
        LocalityCrossroad.query
        .join(Locality, LocalityCrossroad.locality_id == Locality.id)
        .join(RoadSingCrossroad, LocalityCrossroad.road_sing_crossroad_id == RoadSingCrossroad.id)
        .join(Crossroad, RoadSingCrossroad.crossroad_id == Crossroad.id)
        .join(RoadSing, RoadSingCrossroad.road_sing_id == RoadSing.id)
        .join(Road, RoadSing.road_id == Road.id)
        .join(Sing, RoadSing.sing_id == Sing.id)
        .add_columns(
            LocalityCrossroad.id,
            Locality.name_locality,
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
            'name_locality': data.name_locality,
            'crossroads': {
                'type_crossroad': data.type_crossroad,
                'roads': {
                    'number_road': data.number_road,
                    'name_road': data.name_road,
                    'sings': {
                        'sing_id': data.id,
                        'name_sing': data.name_sing,
                        'latitude': data.latitude,
                        'longitude': data.longitude,
                        'image': data.image,
                        'state': data.state,
                        'comment': data.comment,
                    },
                },
            }
        }
        for data in localities_crossroads_from_db
    ]

    return {'items': items}


@user_authenticated
def get_locality_crossroad():
    id = request.args['id']

    locality_crossroad_from_db = LocalityCrossroad.query.filter_by(id=id).first_or_404()
    locality_crossroad = {        
        'id': locality_crossroad_from_db.id,
        'road_sing_crossroad_id': locality_crossroad_from_db.road_sing_crossroad_id,
        'locality_id': locality_crossroad_from_db.locality_id,
    }

    return {'items': locality_crossroad}


@user_authenticated
def create_locality_crossroad():
    road_sing_crossroad_id = request.form['road_sing_crossroad_id']
    locality_id = request.form['locality_id']

    localities_from_db = Locality.query.filter_by(id=locality_id).one_or_none()
    roads_sings_crossroads_from_db = RoadSingCrossroad.query.filter_by(id=road_sing_crossroad_id).one_or_none()

    new_locality_crossroad = LocalityCrossroad(
        road_sing_crossroad_id=roads_sings_crossroads_from_db.id,
        locality_id=localities_from_db.id,
    )
    db.session.add(new_locality_crossroad)
    db.session.commit()

    localities_crossroads_from_db = (
        LocalityCrossroad.query
        .join(Locality, LocalityCrossroad.locality_id == Locality.id)
        .join(RoadSingCrossroad, LocalityCrossroad.road_sing_crossroad_id == RoadSingCrossroad.id)
        .join(Crossroad, RoadSingCrossroad.crossroad_id == Crossroad.id)
        .join(RoadSing, RoadSingCrossroad.road_sing_id == RoadSing.id)
        .join(Road, RoadSing.road_id == Road.id)
        .join(Sing, RoadSing.sing_id == Sing.id)
        .add_columns(
            LocalityCrossroad.id,
            Locality.name_locality,
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
            'id': localities_crossroads_from_db.id,
            'name_locality': localities_crossroads_from_db.name_locality,
            'crossroads': {
                'type_crossroad': localities_crossroads_from_db.type_crossroad,
                'roads': {
                    'number_road': localities_crossroads_from_db.number_road,
                    'name_road': localities_crossroads_from_db.name_road,
                    'sings': {
                        'sing_id': localities_crossroads_from_db.sing_id,
                        'name_sing': localities_crossroads_from_db.name_sing,
                        'latitude': localities_crossroads_from_db.latitude,
                        'longitude': localities_crossroads_from_db.longitude,
                        'image': localities_crossroads_from_db.image,
                    },
                },
            }
    }, 201


@user_authenticated
def update_locality_crossroad():
    id = request.args['id']
    road_sing_crossroad_id = request.form['road_sing_crossroad_id']
    locality_id = request.form['locality_id']

    localities_crossroads = LocalityCrossroad.query.filter_by(id=id).first_or_404()
    localities_from_db = Locality.query.filter_by(id=locality_id).one_or_none()
    roads_sings_crossroads_from_db = RoadSingCrossroad.query.filter_by(id=road_sing_crossroad_id).one_or_none()

    db.session.query(LocalityCrossroad).filter(LocalityCrossroad.id == id).update(
        {
            'road_sing_crossroad_id': roads_sings_crossroads_from_db.id,
            'locality_id': localities_from_db.id,
        }
    )
    db.session.commit()

    localities_crossroads_from_db = (
        LocalityCrossroad.query
        .join(Locality, LocalityCrossroad.locality_id == Locality.id)
        .join(RoadSingCrossroad, LocalityCrossroad.road_sing_crossroad_id == RoadSingCrossroad.id)
        .join(Crossroad, RoadSingCrossroad.crossroad_id == Crossroad.id)
        .join(RoadSing, RoadSingCrossroad.road_sing_id == RoadSing.id)
        .join(Road, RoadSing.road_id == Road.id)
        .join(Sing, RoadSing.sing_id == Sing.id)
        .add_columns(
            LocalityCrossroad.id,
            Locality.name_locality,
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

    items = {
        'id': localities_crossroads_from_db.id,
        'name_locality': localities_crossroads_from_db.name_locality,
        'crossroads': {
            'type_crossroad': localities_crossroads_from_db.type_crossroad,
            'roads': {
                'number_road': localities_crossroads_from_db.number_road,
                'name_road': localities_crossroads_from_db.name_road,
                'sings': {
                    'sing_id': localities_crossroads_from_db.sing_id,
                    'name_sing': localities_crossroads_from_db.name_sing,
                    'latitude': localities_crossroads_from_db.latitude,
                    'longitude': localities_crossroads_from_db.longitude,
                    'image': localities_crossroads_from_db.image,
                    'state': localities_crossroads_from_db.state,
                    'comment': localities_crossroads_from_db.comment,
                },
            },
        }
    }

    return {'items': items}


@user_authenticated
def delete_locality_crossroad():
    id = request.args['id']

    localities_crossroads_from_db = LocalityCrossroad.query.filter_by(id=id).first_or_404()

    db.session.query(LocalityCrossroad).filter(LocalityCrossroad.id == localities_crossroads_from_db.id).delete()
    db.session.commit()

    return '', 204
