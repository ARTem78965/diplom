from flask import request
from flask import jsonify

from app.extensions import db
from app.models import Privilege
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_privileges():
    privileges_from_db = Privilege.query.all()
    privileges = [
        {'id': data.id, 'name_privilege': data.name_privilege}
        for data in privileges_from_db
    ]

    return {'items': privileges}


@user_authenticated
def get_privilege():
    id = request.args['id']

    privileges_from_db = Privilege.query.filter_by(id=id).first_or_404()
    privilege = {
        'id': privileges_from_db.id,
        'name_privilege': privileges_from_db.name_privilege,
    }

    return {'items': privilege}