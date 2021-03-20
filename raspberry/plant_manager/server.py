import requests
import uuid
from plant_connector.enums import SensorType, ControllerType
from datetime import datetime

# server = "https://localhost:5001"
server = "https://pib-server.azurewebsites.net"

def send_datapoint(sensors):
    print("---------- Sending Update ----------")

    (isSuccess, value) = sensors[SensorType.GROUND_MOISTURE.value]
    if isSuccess is False:
        print("Unable to get moisture value.")
        return

    now = datetime.now()
    endpoint = server + "/box-data/ground-humidity"
    data = {
        "dataPointId": str(uuid.uuid4()) ,
        "boxId": "00000000-0000-0000-0000-000000000000",
        "humidity": value,
        "date": now.isoformat()
    }

    response = requests.post(
        endpoint,
        json=data,
        verify=False)

    print("Status code: ", response.status_code)
