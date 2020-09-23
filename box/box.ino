
/********* Others stuff *********/
#include "enums.h"
#include "sensors.h"

/************ SensorManager **************************/

ISensor *sensors[5] = {new BoxTemperature_DTH(), new BoxHumidity_DTH(), new GroundTemperature(), new GroundMoisture(), new LightSensor()};

class SensorManager
{

public:
    SensorManager()
    {
    }

    void Initialize()
    {
        for (byte i = 0; i < 5; i = i + 1)
        {
            sensors[i]->SetupSensor();
        }
    }

    void RunAllSensor()
    {
        for (byte i = 0; i < 5; i = i + 1)
        {
            SensorResult result = sensors[i]->FetchNewData();
            if (result.IsSuccess)
            {
                Serial.print(QueryType::SENSOR_UPDATED);
                Serial.print("/");
                Serial.print(result.Type);
                Serial.print("/");
                Serial.println(result.Value);
            }
            else
            {
                Serial.print(QueryType::ERROR);
                Serial.print("/");
                Serial.print(result.Type);
                Serial.print("/");
                Serial.println(result.ErrorMessage);
            }
        }
    }
};

/************ BoxController **************************/
class BoxController
{
public:
    BoxController()
    {
        m_sensorManager = new SensorManager();
    }

    void Initialize()
    {
        m_sensorManager->Initialize();
    }

    void GetSensors()
    {
        m_sensorManager->RunAllSensor();
    }

    void UpdateController(ControllerType controllerType, int value)
    {
        Serial.print(QueryType::CONTROLLER_UPDATED);
        Serial.print("/");
        Serial.print(controllerType);
        Serial.print("/");
        Serial.println(value);
    }

private:
    SensorManager *m_sensorManager;
};

void Test()
{
}

BoxController boxController;

void setup()
{
    Serial.begin(9600);
    boxController.Initialize();
}

String getValue(String data, char separator, int index)
{
    int found = 0;
    int strIndex[] = {0, -1};
    int maxIndex = data.length() - 1;

    for (int i = 0; i <= maxIndex && found <= index; i++)
    {
        if (data.charAt(i) == separator || i == maxIndex)
        {
            found++;
            strIndex[0] = strIndex[1] + 1;
            strIndex[1] = (i == maxIndex) ? i + 1 : i;
        }
    }
    return found > index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void loop()
{
    if (Serial.available() > 0)
    {
        String data = Serial.readStringUntil('\n');

        String commandTypeStr = getValue(data, '/', 0);
        int commandType = commandTypeStr.toInt();

        if (commandType == CommandType::POKE)
        {
            Serial.println("Pong");
        }
        else if (commandType == CommandType::GET_SENSORS)
        {
            boxController.GetSensors();
        }
        else if (commandType == CommandType::UPDATE_CONTROLLER)
        {
            String controllerTypeStr = getValue(data, '/', 1);
            String value = getValue(data, '/', 2);
            boxController.UpdateController(static_cast<ControllerType>(controllerTypeStr.toInt()), value.toInt());
        }

        Serial.println("ack");
    }
}
