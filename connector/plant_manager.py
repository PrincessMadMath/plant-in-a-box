
from plant_connector import *
from plant_connector import *
from datetime import datetime

enoughWaterTreshold = 150

def mainLoop():
    while True:
        try:
            now = datetime.now()
            print("**************************************************************")
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

            (_, waterValue) = sensors[SensorType.WATER_SENSOR.value]
            (_, groundMoisture) = sensors[SensorType.GROUND_MOISTURE.value]

            isWaterLeft = float(waterValue) > enoughWaterTreshold
            isWaterNeeded = float(groundMoisture) > 500

            if (isWaterNeeded and isWaterLeft):
                print("*****Watering plants!")
                to = turnOnController(ControllerType.WATER_PUMP.value)
                print(to)

            elif (isWaterNeeded and isWaterLeft is False):
                print("*****No more water, Plan need it!")
                to = turnOffController(ControllerType.WATER_PUMP.value)
                print(to)

            elif (isWaterNeeded is False):
                print("*****Plan doesn't need water")
                to = turnOffController(ControllerType.WATER_PUMP.value)
                print(to)

            else:
                print("*****Unknown condition, turning off water")
                to = turnOffController(ControllerType.WATER_PUMP.value)
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

def assitedLoop():
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
                sensors = getSensorsValues()
                printSensorsUpdate(sensors)
            elif command == "2":
                print("Getting controllers value.")
                controllers = getControllersState()
                printControllersState(controllers)
            elif command == "3":
                print("Turning on light.")
                to = turnOnController(ControllerType.LED_LAMP.value)
                print(to)
            elif command == "4":
                print("Turning off light.")
                to = turnOffController(ControllerType.LED_LAMP.value)
                print(to)
            elif command == "5":
                print("Validate water level.")
                sensors = getSensorsValues()
                (_, waterValue) = sensors[SensorType.WATER_SENSOR.value]
                isWaterLeft = float(waterValue) > enoughWaterTreshold

                if isWaterLeft is True: 
                    print("Watering plant.")
                    to = turnOnController(ControllerType.WATER_PUMP.value)
                    print(to)

                    print("Waiting 3s...")
                    time.sleep(3)

                    to = turnOffController(ControllerType.WATER_PUMP.value)
                    print(to)
                    print("Stop watering plant.")
                else: 
                    print("Not enough water.")

        except KeyboardInterrupt:
            print("Keyboard Interrupt")
            break
        except Exception as e:
            print(e)

def manualLoop():
    while True:
        try:
            print("**************************************************************")
            now = datetime.now()
            print("Starting loop: {}".format(now.strftime("%c")))
            command = input("Enter command to send to arduino:\n")

            if command == "1":
                sensors = getSensorsValues()
                printSensorsUpdate(sensors)
            else:
                responses = sendCommand(command)
                for line in responses:
                    print(line)

            

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
    formatSentorUpdate(sensors, SensorType.WATER_SENSOR, "?")

def formatSentorUpdate(sensorsUpdate, sensorType, unitText):
    (isSuccess, value) = sensorsUpdate[sensorType.value]

    if isSuccess is True:
        print("Updated {}:  {} {}".format(sensorType.name, value, unitText))

    else:
        print("Error while getting {}, because {}".format(sensorType.name, value))


def printControllersState(controllers):
    print("---------- Controllers State ----------")

    formatControllerUpdate(controllers, ControllerType.LED_LAMP)
    formatControllerUpdate(controllers, ControllerType.WATER_PUMP)


def formatControllerUpdate(controllersUpdate, controllerType):
    value = controllersUpdate[controllerType.value]

    if value is True:
        print("{} is ON".format(controllerType.name))

    else:
        print("{} is OFF".format(controllerType.name))
