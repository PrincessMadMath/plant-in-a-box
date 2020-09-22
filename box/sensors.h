
// Library pour le sensor DTH (humidity/temperature boite)
#include "DHT.h"
// Library pour le sensor (temperature terre)
#include <OneWire.h>
#include <DallasTemperature.h>
// Library pour le light sensor
#include <Wire.h>   // I2C Library
#include <BH1750.h> // Sensor Library

/************* Config pour les sensors ****************/
// Config pour le sensor DTH
#define DHT_PIN 52     // what pin we're connected to
#define DHT_TYPE DHT22 // DHT 22  (AM2302)

// Config pour le sensor Temperature_Sol
// Data wire is plugged into pin 2 on the Arduino
#define GROUND_TEMPERATURE_PIN 48

//Config pour ground moisture
#define GROUND_MOISTURE_PIN 1

/*********** Monitor **************************/

class Monitor
{
public:
    void OnSensorUpdate(SensorType type, float value)
    {
        Serial.print(UPDATE_SENSOR);
        Serial.print("/");
        Serial.print(type);
        Serial.print("/");
        Serial.println(value);
    }
    void OnSensorError(SensorType type, String messageError)
    {
        Serial.print(RAISE_ERROR);
        Serial.print("/");
        Serial.print(type);
        Serial.print("/");
        Serial.println(messageError);
    }
};

Monitor _monitor;

/************ ISensor **************************/
class ISensor
{
public:
    virtual void SetupSensor() = 0;
    virtual float FetchNewData() = 0;
    SensorType type;
};

/************ BoxTemperature&Humidity_DTH **************************/

DHT dht(DHT_PIN, DHT_TYPE);
class BoxTemperature_DTH : public ISensor
{
public:
    BoxTemperature_DTH()
    {
        type = BOX_TEMPERATURE;
    }
    virtual void SetupSensor()
    {
        dht.begin();
    }
    virtual float FetchNewData()
    {
        float value = dht.readTemperature();
        if (isnan(value))
        {
            _monitor.OnSensorError(type, "Erreur de lecture pour le capteur DHT");
        }
        else
        {
            _monitor.OnSensorUpdate(type, value);
        }
        return value;
    }
};

class BoxHumidity_DTH : public ISensor
{
public:
    BoxHumidity_DTH()
    {
        type = BOX_HUMIDITY;
    }
    virtual void SetupSensor()
    {
        dht.begin();
    }
    virtual float FetchNewData()
    {
        float value = dht.readHumidity();
        if (isnan(value))
        {
            _monitor.OnSensorError(type, "Erreur de lecture avec le capteur DHT");
        }
        else
        {
            _monitor.OnSensorUpdate(type, value);
        }
        return value;
    }
};

/************ GroundTemperature **************************/
// Setup a oneWire instance to communicate with any OneWire devices (not just Maxim/Dallas temperature ICs)
OneWire oneWire(GROUND_TEMPERATURE_PIN);
// Pass our oneWire reference to Dallas Temperature.
DallasTemperature groundTemperatureSensor(&oneWire);

class GroundTemperature : public ISensor
{
public:
    GroundTemperature()
    {
        type = GROUND_TEMPERATURE;
    }
    virtual void SetupSensor()
    {
        groundTemperatureSensor.begin();
    }
    virtual float FetchNewData()
    {
        groundTemperatureSensor.requestTemperatures();
        float value = groundTemperatureSensor.getTempCByIndex(0); // Why "byIndex"? You can have more than one IC on the same bus. 0 refers to the first IC on the wire
        if (isnan(value))
        {
            _monitor.OnSensorError(type, "Erreur de lecture pour le ground_temperature sensor");
        }
        else
        {
            _monitor.OnSensorUpdate(type, value);
        }
        return value;
    }
};

/************ GroundMoisture **************************/
class GroundMoisture : public ISensor
{
public:
    GroundMoisture()
    {
        type = GROUND_MOISTURE;
    }
    virtual void SetupSensor()
    {
    }
    virtual float FetchNewData()
    {
        float value = (float)analogRead(GROUND_MOISTURE_PIN);
        if (isnan(value))
        {
            _monitor.OnSensorError(type, "Erreur de lecture pour le ground_moisture sensor");
        }
        else
        {
            _monitor.OnSensorUpdate(type, value);
        }
        return value;
    }
};

/************ LightSensor **************************/
BH1750 _lightSensor;

class LightSensor : public ISensor
{
public:
    LightSensor()
    {
        type = LIGHT_SENSOR;
    }
    virtual void SetupSensor()
    {
        Wire.begin();
        _lightSensor.begin();
    }
    virtual float FetchNewData()
    {
        float value = (float)_lightSensor.readLightLevel(); // Get Lux value
        if (isnan(value))
        {
            _monitor.OnSensorError(type, "Erreur de lecture pour le light_sensor");
        }
        else
        {
            _monitor.OnSensorUpdate(type, value);
        }
        return value;
    }
};