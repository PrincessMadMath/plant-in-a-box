#include "SensorManager.h"

//Include different sensor
#include "BoxTemperature_DTH.h"

SensorManager* SensorManager::s_instance = 0;

SensorManager* SensorManager::getInstance()
{
	if(s_instance == 0)
	{
		s_instance = new SensorManager();
	}
	return s_instance;
}

SensorManager::SensorManager()
{
	BoxTemperature = new BoxTemperature_DTH();
}