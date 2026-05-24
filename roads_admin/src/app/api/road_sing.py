import os

from flask import abort
from flask import request
from werkzeug.utils import secure_filename

from app import app
from app.extensions import db
from app.models import Road
from app.models import RoadSing
from app.models import Sing
from app.recognition.recognition_sign import recognition_sign
from app.state.state_sing import state_sing
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_roads_sings():
    roads_sings_from_db = (
        RoadSing.query.join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSing.id,
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
            'number_road': data.number_road,
            'name_road': data.name_road,
            'sings': {
                'sing_id': data.sing_id,
                'name_sing': data.name_sing,
                'latitude': data.latitude,
                'longitude': data.longitude,
                'image': data.image,
                'state': data.state,
                'comment': data.comment,
            },
        }
        for data in roads_sings_from_db
    ]

    return {'items': items}


@user_authenticated
def get_road_sing():
    id = request.args['id']

    road_sing_from_db = RoadSing.query.filter_by(id=id).first_or_404()
    road_sing = {
        'id': road_sing_from_db.id,
        'road_id': road_sing_from_db.road_id,
        'sing_id': road_sing_from_db.sing_id,
        'latitude': road_sing_from_db.latitude,
        'longitude': road_sing_from_db.longitude,
        'image': road_sing_from_db.image,
        'state': road_sing_from_db.state,
        'comment': road_sing_from_db.comment,
    }

    return {'items': road_sing}


@user_authenticated
def create_road_sing():
    road_id = request.form['road_id']
    latitude = request.form['latitude']
    longitude = request.form['longitude']
    image = request.files['image']

    imagename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], imagename))
    path_to_img = recognition_sign(os.path.join(app.config['UPLOAD_FOLDER'], imagename))
    get_state_sing = state_sing(os.path.join(app.config['UPLOAD_FOLDER'], imagename))

    sings_from_db = Sing.query.filter_by(name_sing=path_to_img).one_or_none()
    roads_from_db = Road.query.filter_by(id=road_id).one_or_none()

    if roads_from_db is None or sings_from_db is None:
        abort(422)

    if get_state_sing == 'Хорошее состояние':
        new_road_sing = RoadSing(
            road_id=roads_from_db.id,
            sing_id=sings_from_db.id,
            latitude=latitude,
            longitude=longitude,
            image=imagename,
            state=get_state_sing,
            comment=''
        )
    else:
        new_road_sing = RoadSing(
            road_id=roads_from_db.id,
            sing_id=sings_from_db.id,
            latitude=latitude,
            longitude=longitude,
            image=imagename,
            state=get_state_sing,
            comment='Требуется замена дорожного знака'
        )

    db.session.add(new_road_sing)
    db.session.commit()

    roads_sings_from_db = (
        RoadSing.query.filter_by(id=new_road_sing.id)
        .join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSing.id,
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
        .first()
    )

    return {
        'id': roads_sings_from_db.id,
        'number_road': roads_sings_from_db.number_road,
        'name_road': roads_sings_from_db.name_road,
        'sings': {
            'sing_id': roads_sings_from_db.sing_id,
            'name_sing': roads_sings_from_db.name_sing,
            'latitude': roads_sings_from_db.latitude,
            'longitude': roads_sings_from_db.longitude,
            'image': roads_sings_from_db.image,
            'state': roads_sings_from_db.state,
            'comment': roads_sings_from_db.comment,
        },
    }, 201


@user_authenticated
def update_road_sing():
    id = request.args['id']
    road_id = request.form['road_id']
    latitude = request.form['latitude']
    longitude = request.form['longitude']
    image = request.files['image']

    imagename = secure_filename(image.filename)
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], imagename))
    path_to_img = recognition_sign(os.path.join(app.config['UPLOAD_FOLDER'], imagename))
    get_state_sing = state_sing(os.path.join(app.config['UPLOAD_FOLDER'], imagename))

    road_sing_from_db = RoadSing.query.filter_by(id=id).first_or_404()
    sings_from_db = Sing.query.filter_by(name_sing=path_to_img).one_or_none()
    roads_from_db = Road.query.filter_by(id=road_id).one_or_none()

    if roads_from_db is None or sings_from_db is None:
        abort(422)


    if get_state_sing == 'Хорошее состояние':
        db.session.query(RoadSing).filter(RoadSing.id == road_sing_from_db.id).update(
            {
                'road_id': roads_from_db.id,
                'sing_id': sings_from_db.id,
                'latitude': latitude,
                'longitude': longitude,
                'image': imagename,
                'state': get_state_sing,
                'comment': '',
            }
        )
    else:
        db.session.query(RoadSing).filter(RoadSing.id == road_sing_from_db.id).update(
            {
                'road_id': roads_from_db.id,
                'sing_id': sings_from_db.id,
                'latitude': latitude,
                'longitude': longitude,
                'image': imagename,
                'state': get_state_sing,
                'comment': 'Требуется замена дорожного знака',
            }
        )

    db.session.commit()

    roads_sings_from_db = (
        RoadSing.query.filter_by(id=id)
        .join(Road, Road.id == RoadSing.road_id)
        .join(Sing, Sing.id == RoadSing.sing_id)
        .add_columns(
            RoadSing.id,
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
        .first()
    )

    item = {
        'id': roads_sings_from_db.id,
        'number_road': roads_sings_from_db.number_road,
        'name_road': roads_sings_from_db.name_road,
        'sings': {
            'sing_id': roads_sings_from_db.sing_id,
            'name_sing': roads_sings_from_db.name_sing,
            'latitude': roads_sings_from_db.latitude,
            'longitude': roads_sings_from_db.longitude,
            'image': roads_sings_from_db.image,
            'state': roads_sings_from_db.state,
            'comment': roads_sings_from_db.comment,
        },
    }

    return {'items': item}


@user_authenticated
def delete_road_sing():
    id = request.args['id']

    roads_sings_from_db = RoadSing.query.filter_by(id=id).first_or_404()

    db.session.query(RoadSing).filter(RoadSing.id == roads_sings_from_db.id).delete()
    db.session.commit()

    return '', 204
