
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
        Serial.println("Reading sensor");
        for (byte i = 0; i < 5; i = i + 1)
        {
            SensorResult result = sensors[i]->FetchNewData();
            if (result.IsSuccess)
            {
                Serial.print(UPDATE_SENSOR);
                Serial.print("/");
                Serial.print(result.Type);
                Serial.print("/");
                Serial.println(result.Value);
            }
            else
            {
                Serial.print(RAISE_ERROR);
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

    void Run()
    {
        m_sensorManager->RunAllSensor();
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

void loop()
{
    boxController.Run();
}
