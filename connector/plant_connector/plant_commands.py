from plant_connector.arduino_connector import send_command
from plant_connector.enums import (
    CommandType,
    QueryType,
    ControllerType,
    ControllerValue,
)


def poke(controllerType):
    responses = send_command("{}".format(CommandType.POKE.value))
    return responses


def get_sensors_values():
    responses = send_command(CommandType.GET_SENSORS.value)

    sensorUpates = {}
    for line in responses:
        (sensorType, isSuccess, value) = parseSensorUpdate(line)
        sensorUpates[sensorType] = (isSuccess, value)

    return sensorUpates


def parseSensorUpdate(line):
    splitted = line.split("/")

    try:
        operationType = int(splitted[0])

        if operationType == QueryType.ERROR.value:
            sensorType = int(splitted[1])
            value = splitted[2]
            return (sensorType, False, value)
        elif operationType == QueryType.SENSOR_UPDATED.value:
            sensorType = int(splitted[1])
            value = splitted[2]
            return (sensorType, True, value)
    except:
        print("Unhandle line: " + input)


def get_controllers_state():
    controllersState = {}
    controllersState[ControllerType.LED_LAMP.value] = get_controller_state(
        ControllerType.LED_LAMP.value
    )
    controllersState[ControllerType.WATER_PUMP.value] = get_controller_state(
        ControllerType.WATER_PUMP.value
    )

    return controllersState


def get_controller_state(controllerType):
    response = send_command(
        "{}/{}".format(CommandType.GET_CONTROLLER.value, controllerType)
    )

    return response


def turn_on_controller(controllerType):
    response = send_command(
        "{}/{}/{}".format(
            CommandType.UPDATE_CONTROLLER.value,
            controllerType,
            ControllerValue.ON.value,
        )
    )
    return response


def turn_off_controller(controllerType):
    response = send_command(
        "{}/{}/{}".format(
            CommandType.UPDATE_CONTROLLER.value,
            controllerType,
            ControllerValue.OFF.value,
        )
    )
    return response
