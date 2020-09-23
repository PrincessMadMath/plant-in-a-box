# plant-in-a-box

Watch me Felix!

# Arduino code (/box)

## Setup

-   Using VS Code - Arduino Extension is recommended for compiling and uploading the project
-   All dependencies to external library (excepting those core of Arduino) are included in /librairie)
-   To resolve Arduino library update the file ".vscode/c_cpp_properties.json"

## Notes

-   Using workaround to use multiple .ino files => renaming extension to .h

# Python code

## Setup

1. Activate "Virtual Environment": `.venv\scripts\activate`
2. Install requirement `pip install -r requirements.txt`
3. Leave virtual environment: `deactivate`

## Contributing

-   If adding new dependencies don't forget to update requirements: `pip freeze > requirements.txt`
