from arduino_connector import *
from enums import *


def getSensorsValues():
    sendCommand(CommandType.GET_SENSORS.value)