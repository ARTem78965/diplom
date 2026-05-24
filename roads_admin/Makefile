VENV_NAME = venv
PYTHON_VERSION = 3.10.6
PYENV_PYTHON = $(HOME)/.pyenv/versions/$(PYTHON_VERSION)/bin/python
PYTHON_VENV = $(VENV_NAME)/bin/python
PIP_VENV = $(VENV_NAME)/bin/pip
PYTEST_VENV = $(VENV_NAME)/bin/pytest

venv:
	@echo "Установка зависимостей..."
	$(PYENV_PYTHON) -m venv $(VENV_NAME)
	$(PIP_VENV) install --upgrade pip
	$(PIP_VENV) install -r src/requirements.txt

run: venv
	@echo "Запуск приложения..."
	$(PYTHON_VENV) src/main.py

tests: venv
	@echo "Запуск тестов..."
	$(PYTEST_VENV) src/tests/tests_auth_200.py
	$(PYTEST_VENV) src/tests/tests_auth_401.py
	$(PYTEST_VENV) src/tests/tests_users_200.py
	$(PYTEST_VENV) src/tests/tests_privileges_200.py
	$(PYTEST_VENV) src/tests/tests_roads_200.py
	$(PYTEST_VENV) src/tests/tests_sings_200.py
	$(PYTEST_VENV) src/tests/tests_roads_sings_200.py
	$(PYTEST_VENV) src/tests/tests_roads_sings_400.py
	$(PYTEST_VENV) src/tests/tests_crossroads_200.py
	$(PYTEST_VENV) src/tests/tests_crossroads_roads_sings_200.py
	$(PYTEST_VENV) src/tests/tests_localities_200.py
	$(PYTEST_VENV) src/tests/tests_localities_crossroads_roads_sings_200.py
	@echo "Тесты пройдены!"