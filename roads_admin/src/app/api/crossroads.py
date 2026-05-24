from flask import request

from app.extensions import db
from app.models import Crossroad
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_crossroads():
    type_crossroads_from_db = Crossroad.query.all()
    type_crossroads = [{'id': data.id, 'type_crossroad': data.type_crossroad} for data in type_crossroads_from_db]

    return {'items': type_crossroads}


@user_authenticated
def get_crossroad():
    id = request.args['id']

    type_crossroads_from_db = Crossroad.query.filter_by(id=id).first_or_404()
    type_crossroad = {'id': type_crossroads_from_db.id,'type_crossroad': type_crossroads_from_db.type_crossroad}

    return {'items': type_crossroad}


@user_authenticated
def create_crossroad():
    type_crossroad = request.json['type_crossroad']

    new_type_crossroad = Crossroad(type_crossroad=type_crossroad)
    db.session.add(new_type_crossroad)
    db.session.commit()

    return {'id': new_type_crossroad.id, 'type_crossroad': new_type_crossroad.type_crossroad}, 201


@user_authenticated
def update_crossroad():
    id = request.args['id']

    type_crossroad = request.json['type_crossroad']

    db.session.query(Crossroad).filter(Crossroad.id == id).update({'type_crossroad': type_crossroad})
    db.session.commit()

    type_crossroads_from_db = Crossroad.query.filter_by(id=id).first_or_404()
    type_crossroad = {'id': type_crossroads_from_db.id, 'type_crossroad': type_crossroads_from_db.type_crossroad}

    return {'items': type_crossroad}


@user_authenticated
def delete_crossroad():
    id = request.args['id']

    type_crossroads_from_db = Crossroad.query.filter_by(id=id).first_or_404()

    db.session.query(Crossroad).filter(Crossroad.id == type_crossroads_from_db.id).delete()
    db.session.commit()

    return '', 204
