# Arduino code (/arduino)

## Setup

-   Using VS Code - Arduino Extension is recommended for compiling and uploading the project
-   All dependencies to external library (excepting those core of Arduino) are included in /librairie)
-   To resolve Arduino library update the file ".vscode/c_cpp_properties.json"

## Communicate with the Arduino (with serial)

You can send command to the Arduino and one it have completed answering you it will return "ack" which indicate it is ready to receive a new command.

Possibles commands:

-   Poke: "0"
-   Get sensors values: "1"
-   Turn on or off a controller: "2/controller_value/(0,1)"
-   Get controller state: "3/controller_value"

Look into enums.h for more information.

## Notes

-   Using workaround to use multiple .ino files => renaming extension to .h

## Contributing

-   If adding new dependencies don't forget to update requirements: `pip freeze > requirements.txt`
