# Python code

## Setup

(need to create virtual environment before) (`py -3 -m venv .venv` / `python3 -m venv ./venv`)

1. Activate "Virtual Environment": `.venv\scripts\activate` or on Linux `source venv/bin/activate`
2. Install requirement `pip install -r requirements.txt`
3. Leave virtual environment: `deactivate`

## Run the code

Inside the raspberry folder:
-   Start code (manual): `python3 ./main.py`
-   Start code (auto): `python3 ./main.py auto`
-   Start code (assisted): `python3 ./main.py assited`

## Contributing

-   If adding new dependencies don't forget to update requirements: `pip freeze > requirements.txt`

# Raspberry Pi

## How connect to by ssh

-   Connect: `ssh pi@raspberrypi`
-   Password: raspberry

### How setup detach process

If you just start the program on the pi, it will stopped the loop as soon as you disconnect frow the ssh.

-   As recommended here use tmux (https://askubuntu.com/questions/8653/how-to-keep-processes-running-after-ending-ssh-session)
-   To start session: `tmux`
-   To re-attatch: `tmux attach`
-   To logout: Ctrl+B,D