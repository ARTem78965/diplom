from app.extensions import db
from app.models import FixSingLog
from app.decorators.user_authenticated import user_authenticated


@user_authenticated
def read_fix_sings():
    fix_sings_from_db = FixSingLog.query.all()
    fix_sings = [
        {
            'id': data.id,
            'date_fix': data.date_fix,
            'name_sing': data.name_sing,
            'state': data.state,
            'latitude': data.latitude,
            'longitude': data.longitude,
        } for data in fix_sings_from_db
    ]

    return {'items': fix_sings}