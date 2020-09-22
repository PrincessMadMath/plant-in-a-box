#include "BoxController.h"

#include "SensorManager.h"

BoxController* BoxController::s_instance = 0;

BoxController* BoxController::getInstance()
{
	if(s_instance == 0)
	{
		s_instance = new BoxController();
	}
	return s_instance;
}

BoxController::BoxController()
{
	m_sensorManager = SensorManager::getInstance();
}