
/********* Others stuff *********/
#include "enums.h"
#include "sensors.h"

/************ SensorManager **************************/
class SensorManager
{

public:
    SensorManager()
    {
        _boxTemperature = new BoxTemperature_DTH();
        _boxHumidity = new BoxHumidity_DTH();
        _groundTemperature = new GroundTemperature();
        _groundMoisture = new GroundMoisture();
        _lightSensor = new LightSensor();
    }

    void Initialize()
    {
        _boxTemperature->SetupSensor();
        _boxHumidity->SetupSensor();
        _groundMoisture->SetupSensor();
        _groundTemperature->SetupSensor();
        _lightSensor->SetupSensor();
    }

    void RunAllSensor()
    {
        Serial.println("Reading sensor");
        _boxTemperature->FetchNewData();
        _boxHumidity->FetchNewData();
        _groundTemperature->FetchNewData();
        _groundMoisture->FetchNewData();
        _lightSensor->FetchNewData();
    }

private:
    ISensor *_boxTemperature;
    ISensor *_boxHumidity;
    ISensor *_groundMoisture;
    ISensor *_groundTemperature;
    ISensor *_lightSensor;
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
