import serial
import time
from enum import Enum 

# set up the serial line
ser = serial.Serial('COM5', 9600)
time.sleep(2)

class CommandType(Enum):
    POKE = 0
    GET_SENSORS = 1
    UPDATE_CONTROLLER = 2

class QueryType(Enum):
    ERROR = 0
    SENSOR_UPDATED = 1
    CONTROLLER_UPDATED = 2

class SensorType(Enum):
    BOX_TEMPERATURE = 0
    BOX_HUMIDITY = 1
    GROUND_TEMPERATURE = 2
    GROUND_MOISTURE = 3
    LIGHT_SENSOR = 4

class ControllerType(Enum):
    LED_LAMP = 1
    WATER_PUMP = 2
    HEAT_LAMP = 3

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
    operationType = int(splitted[0])

    if operationType == QueryType.ERROR.value:
        controllerType = int(splitted[1])
        value = splitted[2]
        handleError(controllerType, value)
    elif operationType == QueryType.SENSOR_UPDATED.value:
        controllerType = int(splitted[1])
        value = splitted[2]
        handleSensorUpdate(controllerType, value)
    else:
        print("Unhandle line: " + input)
    

while True:
    try:
        sec = input('Enter command.\n')
        send_string = sec + "\n"
        # Send the string. Make sure you encode it before you send it to the Arduino.
        ser.write(send_string.encode('utf-8'))

        isAckReceived = False
        while not isAckReceived:
            if(ser.in_waiting > 0):
                # Read everything until the new line character
                # Convert the data from a byte into a string of type 'utf-8'
                # You could also use 'ascii'
                # rstrip() function removes trailing characters like
                # the new line character '\n'
                line = ser.readline().decode('utf-8').rstrip()

                if(line == "ack"):
                    isAckReceived = True
                elif(line == "Pong"):
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
