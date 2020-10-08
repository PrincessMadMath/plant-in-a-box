import serial
import time

# set up the serial line
ser = serial.Serial('COM5', 9600)
time.sleep(2)

def sendCommand(cmd):
    send_string = cmd + "\n"
    
    # Send the string. Make sure you encode it before you send it to the Arduino.
    ser.write(send_string.encode('utf-8'))

    isAckReceived = False
    lines = []

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
            else:
                lines.append(line)
    
    return lines