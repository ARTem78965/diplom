from datetime import timedelta
from flask import request
from flask import jsonify
from flask_login import login_user
from flask_login import logout_user

from app.extensions import db
from app.models import User
from app.models import Privilege
from app.decorators.user_authenticated import user_authenticated


def login():
    login = request.json['login']
    password = request.json['password']

    user = User.query.filter_by(login=login).first()
    
    if user is not None and user.check_password(password):
        db.session.query(User).filter(User.login == login).update(
            {'is_active': True}
        )
        db.session.commit()

        users_from_db = (
            User.query.filter_by(login=login)
            .join(Privilege, Privilege.id == User.privilege_id)
            .add_columns(
                User.id,
                User.name,
                User.login,
                User.password,
                Privilege.name_privilege,
                User.is_active,
                User.created_on,
                User.updated_on,
            )
            .first_or_404()
        )

        login_user(user, remember=True, duration=timedelta(hours=1))

        return {
            'id': users_from_db.id,
            'login': users_from_db.login,
            'name_privilege': users_from_db.name_privilege,
            'is_active': users_from_db.is_active,
        }

    return jsonify({'message': 'Invalid login or password'}), 401


def logout():
    is_active = False
    id = request.json['id']

    db.session.query(User).filter(User.id == id).update({'is_active': is_active})
    db.session.commit()

    user = User.query.filter_by(id=id).first()

    logout_user()
    return jsonify({'message': 'Logout successful'}), 200


@user_authenticated
def read_users():
    users_from_db = (
        User.query
        .join(Privilege, Privilege.id == User.privilege_id)
        .add_columns(
            User.id,
            User.name,
            User.login,
            User.password,
            Privilege.name_privilege,
            User.is_active,
            User.created_on,
            User.updated_on,
        )
    )

    items = [
        {
            'id': data.id,
            'name': data.name,
            'login': data.login,
            'password': data.password,
            'privilege': data.name_privilege,
            'is_active': data.is_active,
            'created_on': data.created_on,
            'updated_on': data.updated_on,
        }
        for data in users_from_db
    ]

    return {'items': items}


@user_authenticated
def get_user():
    id = request.args['id']

    user = User.query.filter_by(id=id).first()

    users_from_db = (
        User.query.filter_by(id=id)
        .join(Privilege, Privilege.id == User.privilege_id)
        .add_columns(
            User.id,
            User.name,
            User.login,
            User.password,
            Privilege.name_privilege,
            User.is_active,
            User.created_on,
            User.updated_on,
        )
        .first_or_404()
    )

    user = {
        'id': users_from_db.id,
        'name': users_from_db.name,
        'login': users_from_db.login,
        'password': users_from_db.password,
        'privilege': users_from_db.name_privilege,
        'is_active': users_from_db.is_active,
        'created_on': users_from_db.created_on,
        'updated_on': users_from_db.updated_on,
    }

    return {'items': user}


@user_authenticated
def create_user():
    name = request.form['name']
    login = request.form['login']
    password = request.form['password']
    privilege_id = request.form['privilege_id']

    new_user = User(
        name=name,
        login=login,
        password=password,
        privilege_id=privilege_id,
    )
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    users_from_db = (
        User.query.filter_by(id=new_user.id)
        .join(Privilege, Privilege.id == User.privilege_id)
        .add_columns(
            User.id,
            User.name,
            User.login,
            User.password,
            Privilege.name_privilege,
            User.is_active,
            User.created_on,
            User.updated_on,
        )
        .first()
    )

    return {
        'id': users_from_db.id,
        'name': users_from_db.name,
        'login': users_from_db.login,
        'password': users_from_db.password,
        'privilege': users_from_db.name_privilege,
        'is_active': users_from_db.is_active,
        'created_on': users_from_db.created_on,
        'updated_on': users_from_db.updated_on,
    }, 201


@user_authenticated
def update_user():
    id = request.args['id']
    name = request.form['name']
    login = request.form['login']
    password = request.form['password']
    privilege_id = request.form['privilege_id']

    users_from_db = User.query.filter_by(id=id).first_or_404()
    privilege_from_db = Privilege.query.filter_by(id=privilege_id).first_or_404()

    users_from_db = User.query.filter_by(id=id).first_or_404()
    
    users_from_db.name = name
    users_from_db.login = login
    users_from_db.password = password
    users_from_db.privilege_id = privilege_id
    
    users_from_db.set_password(password)

    db.session.commit()

    users_from_db = (
        User.query.filter_by(id=id)
        .join(Privilege, Privilege.id == User.privilege_id)
        .add_columns(
            User.id,
            User.name,
            User.login,
            User.password,
            Privilege.name_privilege,
            User.is_active,
            User.created_on,
            User.updated_on,
        )
        .first()
    )

    item = {
        'id': users_from_db.id,
        'name': users_from_db.name,
        'login': users_from_db.login,
        'password': users_from_db.password,
        'privilege': users_from_db.name_privilege,
        'is_active': users_from_db.is_active,
        'created_on': users_from_db.created_on,
        'updated_on': users_from_db.updated_on,
    }

    return {'items': item}


@user_authenticated
def delete_user():
    id = request.args['id']

    users_from_db = User.query.filter_by(id=id).first_or_404()

    db.session.query(User).filter(User.id == users_from_db.id).delete()
    db.session.commit()

    return '', 204
