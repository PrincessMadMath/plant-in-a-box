import platform
import serial
import time


class ArduinoConnector:
    ser = {}

    # set up the serial line
    def initialize(self):
        os = platform.system()
        print("Detecting platform {}".format(platform))

        if os == "Windows":
            print("Connecting to COM5")
            self.ser = serial.Serial("COM5", 9600)
        else:
            self.ser = serial.Serial("/dev/ttyACM0", 9600)
            print("Connecting to /dev/ttyACM0")

        time.sleep(2)

    def send_command(self, cmd):
        send_string = str(cmd) + "\n"

        # Send the string. Make sure you encode it before you send it to the Arduino.
        self.ser.write(send_string.encode("utf-8"))

        isAckReceived = False
        lines = []

        while not isAckReceived:
            if self.ser.in_waiting > 0:
                # Read everything until the new line character
                # Convert the data from a byte into a string of type 'utf-8'
                # You could also use 'ascii'
                # rstrip() function removes trailing characters like
                # the new line character '\n'
                line = self.ser.readline().decode("utf-8").rstrip()

                if line == "ack":
                    isAckReceived = True
                else:
                    lines.append(line)

        return lines

    def cleanup(self):
        self.ser.close()


arduino_connector = ArduinoConnector()