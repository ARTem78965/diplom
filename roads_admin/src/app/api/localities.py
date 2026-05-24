from flask import request

from app.extensions import db
from app.models import Locality
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_localities():
    localities_from_db = Locality.query.all()
    localities = [
        {'id': data.id, 'name_locality': data.name_locality}
        for data in localities_from_db
    ]

    return {'items': localities}


@user_authenticated
def get_locality():
    id = request.args['id']

    localities_from_db = Locality.query.filter_by(id=id).first_or_404()
    locality = {
        'id': localities_from_db.id,
        'name_locality': localities_from_db.name_locality,
    }

    return {'items': locality}


@user_authenticated
def create_locality():
    name_locality = request.json['name_locality']

    new_locality = Locality(name_locality=name_locality)
    db.session.add(new_locality)
    db.session.commit()

    return {
        'id': new_locality.id,
        'name_locality': new_locality.name_locality,
    }, 201


@user_authenticated
def update_locality():
    id = request.args['id']

    name_locality = request.json['name_locality']

    db.session.query(Locality).filter(Locality.id == id).update(
        {'name_locality': name_locality}
    )
    db.session.commit()

    localities_from_db = Locality.query.filter_by(id=id).first_or_404()
    locality = {
        'id': localities_from_db.id,
        'name_locality': localities_from_db.name_locality,
    }

    return {'items': locality}


@user_authenticated
def delete_locality():
    id = request.args['id']

    localities_from_db = Locality.query.filter_by(id=id).first_or_404()

    db.session.query(Locality).filter(Locality.id == localities_from_db.id).delete()
    db.session.commit()

    return '', 204