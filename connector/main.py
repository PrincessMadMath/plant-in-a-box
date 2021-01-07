import sys

from app import run

args = sys.argv[1:]

# Options are
## auto
## assisted
## manual
programRole = sys.argv[1] if len(args) == 1 else "manual"
run(programRole)
