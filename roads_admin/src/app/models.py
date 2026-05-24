from datetime import datetime
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from flask_login import UserMixin

from .extensions import db
from .extensions import login_manager


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    name = db.Column(db.String, nullable=False, comment='Full_Name')
    login = db.Column(db.String, unique=True, nullable=False, comment='Login')
    password = db.Column(db.String, nullable=False, comment='Password')
    privilege_id = db.Column(db.Integer, db.ForeignKey('privilege.id'), nullable=False, comment='Privilege_ID')
    is_active = db.Column(db.Boolean, default=False, comment='Is Active')
    created_on = db.Column(db.DateTime(), default=datetime.utcnow)
    updated_on = db.Column(db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    @login_manager.user_loader
    def load_user(user_id):
        return db.session.query(User).get(user_id)


class Privilege(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    name_privilege = db.Column(db.String, nullable=False, comment='Name_Privilege')

class Road(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    number_road = db.Column(db.String, unique=True, nullable=False, comment='Number_Road')
    name_road = db.Column(db.String, unique=True, nullable=False, comment='Name_Road')


class Sing(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    name_sing = db.Column(db.String, unique=True, nullable=False, comment='Name_Sing')


class RoadSing(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    road_id = db.Column(db.Integer, db.ForeignKey('road.id'), nullable=False, comment='Road_ID')
    sing_id = db.Column(db.Integer, db.ForeignKey('sing.id'), nullable=False, comment='Sing_ID')
    latitude = db.Column(db.Float, nullable=False, comment='Latitude')
    longitude = db.Column(db.Float, nullable=False, comment='Longitude')
    image = db.Column(db.String, nullable=False, comment='Image')
    state = db.Column(db.String, nullable=False, comment='State sing')
    comment = db.Column(db.String, nullable=True, comment='State sing')


class Crossroad(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    type_crossroad = db.Column(db.String, unique=True, nullable=False, comment='Type_Crossroad')

class RoadSingCrossroad(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    road_sing_id = db.Column(db.Integer, db.ForeignKey('road_sing.id'), nullable=False, comment='Road_Sing_ID')
    crossroad_id = db.Column(db.Integer, db.ForeignKey('crossroad.id'), nullable=False, comment='Crossroad_ID')


class Locality(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    name_locality = db.Column(db.String, unique=True, nullable=False, comment='Name_Locality')


class LocalityCrossroad(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False, comment='ID')
    road_sing_crossroad_id = db.Column(db.Integer, db.ForeignKey('road_sing_crossroad.id'), nullable=False, comment='Crossroad_Road_Sing_ID')
    locality_id = db.Column(db.Integer, db.ForeignKey('locality.id'), nullable=False, comment='Locality_ID')
