import requests
import uuid
from plant_connector.enums import SensorType, ControllerType
from datetime import datetime

# server = "https://localhost:5001"
server = "https://pib-server.azurewebsites.net"
boxId = "88b2f49e-1226-4964-9aa9-9b1f8442fd36"

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
        "boxId": boxId,
        "humidity": value,
        "date": now.isoformat()
    }

    response = requests.post(
        endpoint,
        json=data,
        verify=False)

    print("Status code: ", response.status_code)
