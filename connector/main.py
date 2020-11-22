import sys
from enums import *
from arduino_connector import *
from plant_manager import *

args = sys.argv[1:]



# By default it's manual, other options is "auto"
programRole = sys.argv[1] if len(args) == 1 else "manual" 

if programRole == "auto":
    print("Starting program in automatic mode")
    mainLoop()
else: 
    print("Starting program in manual mode")
    manualLoop()

# Finally
ser.close()
