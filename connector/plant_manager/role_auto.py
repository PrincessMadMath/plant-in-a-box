from datetime import datetime

from plant_connector.plant_commands import *
from plant_connector.enums import *
from utils import *

enoughWaterTreshold = 150


def auto_loop():
    while True:
        try:
            now = datetime.now()
            print("**************************************************************")
            print("Starting loop: {}".format(now.strftime("%c")))
            sensors = get_sensors_values()
            print_sensors_update(sensors)

            print("---------- Controlling the environment ----------")

            if (now.hour > 7) and (now.hour < 22):
                print("Daytime: Turning on light")
                to = turn_on_controller(ControllerType.LED_LAMP.value)
                print(to)

            else:
                print("Nighttime: Turning off light")
                to = turn_off_controller(ControllerType.LED_LAMP.value)
                print(to)

            (_, waterValue) = sensors[SensorType.WATER_SENSOR.value]
            (_, groundMoisture) = sensors[SensorType.GROUND_MOISTURE.value]

            isWaterLeft = float(waterValue) > enoughWaterTreshold
            isWaterNeeded = float(groundMoisture) > 500

            if isWaterNeeded and isWaterLeft:
                print("*****Watering plants!")
                to = turn_on_controller(ControllerType.WATER_PUMP.value)
                print(to)

            elif isWaterNeeded and isWaterLeft is False:
                print("*****No more water, Plan need it!")
                to = turn_off_controller(ControllerType.WATER_PUMP.value)
                print(to)

            elif isWaterNeeded is False:
                print("*****Plan doesn't need water")
                to = turn_off_controller(ControllerType.WATER_PUMP.value)
                print(to)

            else:
                print("*****Unknown condition, turning off water")
                to = turn_off_controller(ControllerType.WATER_PUMP.value)
                print(to)

            controllers = get_controllers_state()
            print_controllers_State(controllers)

            print("Loop Ended")

            time.sleep(0.5)

        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            break
        except Exception as e:
            print(e)
