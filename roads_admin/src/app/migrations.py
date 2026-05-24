import sys
import time

from flask import Flask
from sqlalchemy.exc import OperationalError
from sqlalchemy.exc import SQLAlchemyError

from .extensions import db
from .models import Road
from .models import Sing
from .models import RoadSing
from .models import Locality
from .models import LocalityCrossroad
from .models import Crossroad
from .models import RoadSingCrossroad
from .models import User
from .models import Privilege

TOTAL_ATTEMPTS = 15
DB_MODELS = (Road, Sing, RoadSing, Locality, LocalityCrossroad, Crossroad, RoadSingCrossroad, User, Privilege, )


def db_init(app: Flask) -> Flask:
    with app.app_context():
        for attempt in range(TOTAL_ATTEMPTS):
            app.logger.info(f"Database intilization attempt ({attempt}/{TOTAL_ATTEMPTS})!")
            
            try:
                db.drop_all()
                db.create_all()

                if len(Privilege.query.all()) == 0:
                    privileges_data = [
                        {'name_privilege': 'Администратор'},
                        {'name_privilege': 'Пользователь'},
                    ]

                    for privilege_data in privileges_data:
                        privilege = Privilege(name_privilege=privilege_data['name_privilege'])
                        db.session.add(privilege)
                
                if len(User.query.all()) == 0:
                    users_data = [
                        {'name': 'Администратор', 'login': 'admin', 'privilege_id': 1},
                    ]

                    for user_data in users_data:
                        user = User(
                            name=user_data['name'],
                            login=user_data['login'],
                            privilege_id=user_data['privilege_id'],
                        )
                        user.set_password(user_data['login'])
                        db.session.add(user)

                if len(Sing.query.all()) == 0:
                    sings_data = [
                        {'name_sing': 'Пешеходный переход'},
                        {'name_sing': 'Скользкая дорога'},
                        {'name_sing': 'Дикие животные'},
                        {'name_sing': 'Главная дорога'},
                        {'name_sing': 'Въезд запрещен'},
                        {'name_sing': 'Пешеходное движение запрещено'},
                        {'name_sing': 'Обгон запрещен'},
                        {'name_sing': 'Одностороннее движение'},
                        {'name_sing': 'Парковочное место'},
                        {'name_sing': 'Тупик'},
                    ]
                    
                    for sing_data in sings_data:
                        sing = Sing(name_sing=sing_data['name_sing'])
                        db.session.add(sing)

                if len(Crossroad.query.all()) == 0:
                    type_crossroads_data = [
                        {'type_crossroad': 'Четырехсторонний перекресток'},
                        {'type_crossroad': 'Т-образный перекресток'},
                        {'type_crossroad': 'У-образный перекресток'},
                        {'type_crossroad': 'Х-образный перекресток'},
                        {'type_crossroad': 'Перекресток кругового движения'},
                    ]
                    
                    for type_crossroad_data in type_crossroads_data:
                        type_crossroad = Crossroad(type_crossroad=type_crossroad_data['type_crossroad'])
                        db.session.add(type_crossroad)

                db.session.commit()
                app.logger.info("Database initialized successfully!")
                break

            except (SQLAlchemyError, OperationalError) as e:
                app.logger.error(f"Database error: {e}!")
                time.sleep(1)
                continue

        else:
            app.logger.error("Failed to initialize database after all attempts!")
            sys.exit()
            
    return app
