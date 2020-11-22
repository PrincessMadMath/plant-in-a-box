enum CommandType
{
    POKE = 0,
    GET_SENSORS = 1,
    UPDATE_CONTROLLER = 2,
    GET_CONTROLLER = 3,
};

enum QueryType
{
    ERROR = 0,
    SENSOR_UPDATED = 1,
    CONTROLLER_UPDATED = 2
};

enum SensorType
{
    BOX_TEMPERATURE = 0,
    BOX_HUMIDITY = 1,
    GROUND_TEMPERATURE = 2,
    GROUND_MOISTURE = 3,
    LIGHT_SENSOR = 4,
    WATER_SENSOR = 5
};

enum ControllerType
{
    LED_LAMP = 1,
    WATER_PUMP = 2,
    HEAT_LAMP = 3,
};

enum ControllerValue
{
    OFF = 0,
    ON = 1,
};