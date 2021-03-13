import requests
import uuid
from plant_connector.enums import SensorType, ControllerType
from datetime import datetime

def send_datapoint(sensors):
    print("---------- Sending Update ----------")


    # (isSuccess, value) = sensorsUpdate[SensorType.GROUND_MOISTURE]
    now = datetime.now()
    # endpoint = "https://192.168.50.70:5001/box-data/ground-humidity"
    endpoint = "https://httpbin.org/post"
    data = {
        "dataPointId": str(uuid.uuid4()) ,
        "boxId": "1a6acc00-29d7-4ab1-a621-04f02be46106",
        "humidity": 10,
        "date": now.isoformat()
    }

    response = requests.post(
        endpoint,
        json=data,
        verify=False)

    print("Status code: ", response.status_code)
    print("Printing Entire Post Request")
    print(response.json())
