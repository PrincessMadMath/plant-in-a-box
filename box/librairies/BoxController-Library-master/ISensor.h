/*
	Interface implémenté par chaque sensor
*/

#pragma once


class ISensor
{

public:
	virtual void SetupSensor() = 0;
	virtual float FetchNewData() = 0;

};