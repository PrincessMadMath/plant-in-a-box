/*
	Gère les sensor
*/

#pragma once

#include "Isensor.h"

class SensorManager
{

public:
	static SensorManager* getInstance();
	bool TestAllSensor();
	void UpdateData();
	

private:
	static SensorManager* s_instance;
	SensorManager();
	

	ISensor* BoxTemperature;
};