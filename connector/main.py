from enums import *
from arduino_connector import *

def handleSensorUpdate(sensorType, value):
    
    if sensorType == SensorType.BOX_TEMPERATURE.value:
        print("Updated box temperature: " + value + "°C")

    elif sensorType == SensorType.BOX_HUMIDITY.value:
        print("Updated box humidity: " + value + "%")

    elif sensorType == SensorType.GROUND_TEMPERATURE.value:
        print("Updated ground temperature: " + value + "°C")

    elif sensorType == SensorType.GROUND_MOISTURE.value:
        print("Updated ground moisture: " + value + "?")

    elif sensorType == SensorType.LIGHT_SENSOR.value:
        print("Updated light: " + value + "lux")

def handleError(controllerType, value):
    print("Error on controller: " + str(controllerType) + ", because: " + value)


def handleInput(input):
    splitted = input.split("/")

    try:
        operationType = int(splitted[0])

        if operationType == QueryType.ERROR.value:
            controllerType = int(splitted[1])
            value = splitted[2]
            handleError(controllerType, value)
        elif operationType == QueryType.SENSOR_UPDATED.value:
            controllerType = int(splitted[1])
            value = splitted[2]
            handleSensorUpdate(controllerType, value)
    except:
        print("Unhandle line: " + input)

    

while True:
    try:
        sec = input('Enter command (v2).\n')
        lines = sendCommand(sec)

        for line in lines: 
            if(line == "Pong"):
                print(line)
            else:
                handleInput(line)

    except KeyboardInterrupt:
        print("Keyboard Interrupt")
        break
    except Exception as e:
        print(e)


# Finally
ser.close()
