import sys

from plant_manager.role_auto import auto_loop
from plant_manager.role_assisted import assited_loop
from plant_manager.role_manual import manual_loop
from plant_connector.arduino_connector import initialize

# Options are
## auto
## assisted
## manual
def run(programRole):
    initialize()
    send_command()
    if programRole == "auto":
        print("Starting program in automatic mode")
        auto_loop()
    if programRole == "assisted":
        print("Starting program in assisted mode")
        assited_loop()
    else:
        print("Starting program in manual mode")
        manual_loop()
