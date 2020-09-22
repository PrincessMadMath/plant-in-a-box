//Config pour ground moisture
#define GROUND_MOISTURE_PIN 1

void setup()
{ // put your setup code here, to run once:
    Serial.begin(9600);
    Serial.println("Ground Moisture");
}

void loop()
{
    float value = (float)analogRead(GROUND_MOISTURE_PIN);
    Serial.print("Ground moisture: ");
    Serial.println(value);
    delay(1000);
}
