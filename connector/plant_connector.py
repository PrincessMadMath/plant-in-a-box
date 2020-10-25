from arduino_connector import *
from enums import *

def poke(controllerType):
    responses = sendCommand("{}".format(CommandType.POKE.value))
    return responses


def getSensorsValues():
    responses = sendCommand(CommandType.GET_SENSORS.value)

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

def getControllersState():
    controllersState = {}
    controllersState[ControllerType.LED_LAMP.value] = getControllerState(ControllerType.LED_LAMP.value)
    
    return controllersState

def getControllerState(controllerType):
    response = sendCommand("{}/{}".format(CommandType.GET_CONTROLLER.value, controllerType))
    
    return response

def turnOnController(controllerType):
    response = sendCommand("{}/{}/{}".format(CommandType.UPDATE_CONTROLLER.value, controllerType, ControllerValue.ON.value))
    return response

def turnOffController(controllerType):
    response = sendCommand("{}/{}/{}".format(CommandType.UPDATE_CONTROLLER.value, controllerType, ControllerValue.OFF.value))
    return response



