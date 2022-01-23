import time
from datetime import datetime

from plant_connector.plant_commands import (
    get_sensors_values,
    get_controllers_state,
    turn_on_controller,
    turn_off_controller,
)
from plant_connector.enums import ControllerType, SensorType
from plant_manager.utils import print_sensors_update, print_controllers_state

enoughWaterTreshold = 150


def assited_loop():
    while True:
        try:
            now = datetime.now()
            print("**************************************************************")
            print("Starting loop: {}".format(now.strftime("%c")))
            print("Commands:")
            print("-- 1: Get Sensors")
            print("-- 2: Get Controllers")
            print("-- 3: Turn on light")
            print("-- 4: Turn off light")
            print("-- 5: Turn on water for 3s")

            command = input("Enter command to send to arduino:\n")

            if command == "1":
                print("Getting sensors value.")
                sensors = get_sensors_values()
                print_sensors_update(sensors)
            elif command == "2":
                print("Getting controllers value.")
                controllers = get_controllers_state()
                print_controllers_state(controllers)
            elif command == "3":
                print("Turning on light.")
                to = turn_on_controller(ControllerType.LED_LAMP.value)
                print(to)
            elif command == "4":
                print("Turning off light.")
                to = turn_off_controller(ControllerType.LED_LAMP.value)
                print(to)
            elif command == "5":
                print("Validate water level.")
                sensors = get_sensors_values()
                (_, waterValue) = sensors[SensorType.WATER_SENSOR.value]
                isWaterLeft = float(waterValue) > enoughWaterTreshold

                if isWaterLeft is True:
                    print("Watering plant.")
                    to = turn_on_controller(ControllerType.WATER_PUMP.value)
                    print(to)

                    print("Waiting 3s...")
                    time.sleep(3)

                    to = turn_off_controller(ControllerType.WATER_PUMP.value)
                    print(to)
                    print("Stop watering plant.")
                else:
                    print("Not enough water.")

        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            break
        except Exception as e:
            print(e)
