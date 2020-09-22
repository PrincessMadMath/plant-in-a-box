/*
	Coeur du programme
*/

#pragma once

#include "SensorManager.h"


class BoxController
{

public:
	static BoxController* getInstance();

private:
	static BoxController* s_instance;
	BoxController();
	SensorManager* m_sensorManager;
};