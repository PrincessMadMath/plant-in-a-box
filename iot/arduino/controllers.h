

class Controller
{
private:
    int PinNumber;

public:
    Controller(int pinNumber)
    {
        PinNumber = pinNumber;
    }

    void Setup()
    {
        pinMode(PinNumber, OUTPUT);
    }
    void TurnOn()
    {
        digitalWrite(PinNumber, HIGH);
    };
    void TurnOff()
    {
        digitalWrite(PinNumber, LOW);
    };
    bool IsTurnOn()
    {
        return digitalRead(PinNumber) == HIGH;
    };
};