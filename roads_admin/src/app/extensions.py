import os

from flask_first import First
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

basedir = os.path.abspath(os.path.dirname(__file__))
path_to_spec = os.path.join(basedir, 'api/openapi.yaml')

db = SQLAlchemy()
cors = CORS()
login_manager = LoginManager()
first = First(path_to_spec, swagger_ui_path='/docs')


def register_extensions(app):
    from .api.users import login
    from .api.users import logout
    from .api.users import create_user
    from .api.users import read_users
    from .api.users import get_user
    from .api.users import update_user
    from .api.users import delete_user

    from .api.privileges import read_privileges
    from .api.privileges import get_privilege

    from .api.roads import create_road
    from .api.roads import read_roads
    from .api.roads import get_road
    from .api.roads import update_road
    from .api.roads import delete_road

    from .api.sings import create_sing
    from .api.sings import get_sing
    from .api.sings import read_sings
    from .api.sings import update_sing
    from .api.sings import delete_sing

    from .api.road_sing import create_road_sing
    from .api.road_sing import get_road_sing
    from .api.road_sing import read_roads_sings
    from .api.road_sing import update_road_sing
    from .api.road_sing import delete_road_sing

    from .api.crossroads import create_crossroad
    from .api.crossroads import get_crossroad
    from .api.crossroads import read_crossroads
    from .api.crossroads import update_crossroad
    from .api.crossroads import delete_crossroad

    from .api.crossroads_roads_sings import create_road_sing_crossroad
    from .api.crossroads_roads_sings import get_road_sing_crossroad
    from .api.crossroads_roads_sings import read_roads_sings_crossroads
    from .api.crossroads_roads_sings import update_road_sing_crossroad
    from .api.crossroads_roads_sings import delete_road_sing_crossroad

    from .api.localities import create_locality
    from .api.localities import get_locality
    from .api.localities import read_localities
    from .api.localities import update_locality
    from .api.localities import delete_locality
    
    from .api.localities_crossroads import create_locality_crossroad
    from .api.localities_crossroads import get_locality_crossroad
    from .api.localities_crossroads import read_localities_crossroads
    from .api.localities_crossroads import update_locality_crossroad
    from .api.localities_crossroads import delete_locality_crossroad


    db.init_app(app)
    cors.init_app(
        app, 
        supports_credentials=True,
        methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allow_headers=['Content-Type', 'Authorization'],
    )
    login_manager.init_app(app)
    login_manager.login_view = 'login'
    first.init_app(app)

    first.add_view_func(login)
    first.add_view_func(logout)
    first.add_view_func(create_user)
    first.add_view_func(read_users)
    first.add_view_func(get_user)
    first.add_view_func(update_user)
    first.add_view_func(delete_user)

    first.add_view_func(read_privileges)
    first.add_view_func(get_privilege)

    first.add_view_func(create_road)
    first.add_view_func(read_roads)
    first.add_view_func(get_road)
    first.add_view_func(update_road)
    first.add_view_func(delete_road)

    first.add_view_func(create_sing)
    first.add_view_func(read_sings)
    first.add_view_func(get_sing)
    first.add_view_func(update_sing)
    first.add_view_func(delete_sing)

    first.add_view_func(create_road_sing)
    first.add_view_func(get_road_sing)
    first.add_view_func(read_roads_sings)
    first.add_view_func(update_road_sing)
    first.add_view_func(delete_road_sing)

    first.add_view_func(create_crossroad)
    first.add_view_func(get_crossroad)
    first.add_view_func(read_crossroads)
    first.add_view_func(update_crossroad)
    first.add_view_func(delete_crossroad)

    first.add_view_func(create_road_sing_crossroad)
    first.add_view_func(get_road_sing_crossroad)
    first.add_view_func(read_roads_sings_crossroads)
    first.add_view_func(update_road_sing_crossroad)
    first.add_view_func(delete_road_sing_crossroad)

    first.add_view_func(create_locality)
    first.add_view_func(get_locality)
    first.add_view_func(read_localities)
    first.add_view_func(update_locality)
    first.add_view_func(delete_locality)

    first.add_view_func(create_locality_crossroad)
    first.add_view_func(get_locality_crossroad)
    first.add_view_func(read_localities_crossroads)
    first.add_view_func(update_locality_crossroad)
    first.add_view_func(delete_locality_crossroad)
