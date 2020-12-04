import sys

from plant_manager.role_auto import auto_loop
from plant_manager.role_assisted import assited_loop
from plant_manager.role_manual import manual_loop

args = sys.argv[1:]

# Options are
## auto
## assisted
## manual
programRole = sys.argv[1] if len(args) == 1 else "manual"

if programRole == "auto":
    print("Starting program in automatic mode")
    auto_loop()
if programRole == "assisted":
    print("Starting program in assisted mode")
    assited_loop()
else:
    print("Starting program in manual mode")
    manual_loop()
