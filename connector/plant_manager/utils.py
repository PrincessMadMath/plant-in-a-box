from plant_connector.enums import *


def print_sensors_update(sensors):

    print("---------- Sensors Update ----------")

    format_sentor_update(sensors, SensorType.BOX_TEMPERATURE, "°C")
    format_sentor_update(sensors, SensorType.BOX_HUMIDITY, "%")
    format_sentor_update(sensors, SensorType.GROUND_TEMPERATURE, "°C")
    format_sentor_update(sensors, SensorType.GROUND_MOISTURE, "?")
    format_sentor_update(sensors, SensorType.LIGHT_SENSOR, "lux")
    format_sentor_update(sensors, SensorType.WATER_SENSOR, "?")


def format_sentor_update(sensorsUpdate, sensorType, unitText):
    (isSuccess, value) = sensorsUpdate[sensorType.value]

    if isSuccess is True:
        print("Updated {}:  {} {}".format(sensorType.name, value, unitText))

    else:
        print("Error while getting {}, because {}".format(sensorType.name, value))


def print_controllers_State(controllers):
    print("---------- Controllers State ----------")

    format_controller_update(controllers, controllerType.LED_LAMP)
    format_controller_update(controllers, ControllerType.WATER_PUMP)


def format_controller_update(controllersUpdate, controllerType):
    value = controllersUpdate[controllerType.value]

    if value is True:
        print("{} is ON".format(controllerType.name))

    else:
        print("{} is OFF".format(controllerType.name))
