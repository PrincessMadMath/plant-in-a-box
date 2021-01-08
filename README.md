# plant-in-a-box

Watch me Felix!

# Arduino code (/box)

## Setup

-   Using VS Code - Arduino Extension is recommended for compiling and uploading the project
-   All dependencies to external library (excepting those core of Arduino) are included in /librairie)
-   To resolve Arduino library update the file ".vscode/c_cpp_properties.json"

## Communicate with the Arduino (with serial)

You can send command to the Arduino and one it have completed answering you it will return "ack" which indicate it is ready to receive a new command.

Possibles commands:

-   Poke: "0"
-   Get sensors values: "1"
-   Turn on or off a controller: "2/controller_value/(0,1)"
-   Get controller state: "3/controller_value"

Look into enums.h for more information.

## Notes

-   Using workaround to use multiple .ino files => renaming extension to .h

# Python code

## Setup

(need to create virtual environment before) (`py -3 -m venv .venv` / `python3 -m venv ./env`)

1. Activate "Virtual Environment": `.venv\scripts\activate` or on Linux `source env/bin/activate`
2. Install requirement `pip install -r requirements.txt`
3. Leave virtual environment: `deactivate`

## Run the code

-   Start code (manual): `python3 ./connector/main.py`
-   Start code (auto): `python3 ./connector/main.py auto`
-   Start code (assisted): `python3 ./connector/main.py assited`

## Contributing

-   If adding new dependencies don't forget to update requirements: `pip freeze > requirements.txt`

# Raspberry Pi

## How connect to by ssh

-   Connect: `ssh pi@raspberrypi`
-   Password: raspberry

### How setup detach process

If you just start the program on the pi, it will stopped the loop as soon as you disconnect frow the ssh.

-   As recommended here use tmux (https://askubuntu.com/questions/8653/how-to-keep-processes-running-after-ending-ssh-session)
