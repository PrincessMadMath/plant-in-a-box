import time

from plant_connector.plant_commands import *
from plant_connector.enums import *
from datetime import datetime
from utils import *


def manual_loop():
    while True:
        try:
            print("**************************************************************")
            now = datetime.now()
            print("Starting loop: {}".format(now.strftime("%c")))
            command = input("Enter command to send to arduino:\n")

            if command == "1":
                sensors = get_sensors_values()
                print_sensors_update(sensors)
            else:
                responses = send_command(command)
                for line in responses:
                    print(line)

        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            break
        except Exception as e:
            print(e)
