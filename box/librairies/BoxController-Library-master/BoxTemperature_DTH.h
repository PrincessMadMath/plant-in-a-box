#include "ISensor.h"

class DTH;

class BoxTemperature_DTH : public ISensor
{
public: 
  BoxTemperature_DTH();
	virtual void SetupSensor();
	virtual float FetchNewData();
private:
  DHT* m_DTHSensor;
};