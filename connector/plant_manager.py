
from plant_connector import *
from datetime import datetime

def mainLoop():
    while True:
        try:
            now = datetime.now()
            print("Starting loop: {}".format(now.strftime("%c")))
            sensors = getSensorsValues()
            printSensorsUpdate(sensors)

            print("---------- Controlling the environment ----------")

            if ((now.hour > 7) and (now.hour < 19)):
                print("Daytime: Turning on light")
                to = turnOnController(ControllerType.LED_LAMP.value)
                print(to)

            else :
                print("Nighttime: Turning off light")
                to = turnOffController(ControllerType.LED_LAMP.value)
                print(to)

            controllers = getControllersState()
            printControllersState(controllers)

            print("Loop Ended")

            time.sleep(0.5)

        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            break
        except Exception as e:
            print(e)

def printSensorsUpdate(sensors):

    print("---------- Sensors Update ----------")
    
    formatSentorUpdate(sensors, SensorType.BOX_TEMPERATURE, "°C")
    formatSentorUpdate(sensors, SensorType.BOX_HUMIDITY, "%")
    formatSentorUpdate(sensors, SensorType.GROUND_TEMPERATURE, "°C")
    formatSentorUpdate(sensors, SensorType.GROUND_MOISTURE, "?")
    formatSentorUpdate(sensors, SensorType.LIGHT_SENSOR, "lux")

def formatSentorUpdate(sensorsUpdate, sensorType, unitText):
    (isSuccess, value) = sensorsUpdate[sensorType.value]

    if isSuccess is True:
        print("Updated {}:  {} {}".format(sensorType.name, value, unitText))

    else:
        print("Error while getting {}, because {}".format(sensorType.name, value))


def printControllersState(controllers):
    print("---------- Controllers State ----------")

    formatControllerUpdate(controllers, ControllerType.LED_LAMP)


def formatControllerUpdate(controllersUpdate, controllerType):
    value = controllersUpdate[controllerType.value]

    if value is True:
        print("{} is ON".format(controllerType.name))

    else:
        print("{} is OFF".format(controllerType.name))
