#include "FakeObject.h"

FakeObject::FakeObject()
{
	value = 1;
}

int FakeObject::FakeMethod()
{
	value++;
	return value;
}