# Python code

## Setup

(need to create virtual environment before) (`py -3 -m venv .venv` / `python3 -m venv .venv`)

1. Activate "Virtual Environment": `.venv\scripts\activate` or on Linux `source env/bin/activate`
2. Install requirement `pip install -r requirements.txt`
3. Leave virtual environment: `deactivate`

## Run the code

-   Start code (manual): `python3 ./connector/main.py`
-   Start code (auto): `python3 ./connector/main.py auto`
-   Start code (assisted): `python3 ./connector/main.py assited`

## Contributing

-   If adding new dependencies don't forget to update requirements: `pip freeze > requirements.txt`