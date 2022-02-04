# Plant In A Box (PIB)

<br />
<div align="center">
  <a href="https://github.com/PrincessMadMath/plant-in-a-box">
    <img src="docs/images/logo.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    Plant in a Box!
    <br />
    <br />
    <a href="https://example.com/">View Demo</a>
    ·
    <a href="https://github.com/PrincessMadMath/plant-in-a-box/issues">Report Bug</a>
    ·
    <a href="https://github.com/PrincessMadMath/plant-in-a-box/issues">Request Feature</a>
  </p>
</div>

<p align="center">
  <a href="https://github.com/PrincessMadMath/plant-in-a-box/actions/workflows/backend-ci.yml">
    <img src="https://github.com/PrincessMadMath/plant-in-a-box/actions/workflows/backend-ci.yml/badge.svg" alt="Backend CI" />
  </a>&nbsp;
  <a href="https://github.com/PrincessMadMath/plant-in-a-box/actions/workflows/frontend-ci.yml">
    <img src="https://github.com/PrincessMadMath/plant-in-a-box/actions/workflows/frontend-ci.yml/badge.svg" alt="Frontend CI" />
  </a>&nbsp;
</p>

## About The Project

This is a project about automatic indoor home plant growth. It will help keep plants alive with minimal human intervention and alert humans when intervention is required before it is too late for the plant.

### Built With

-   [ASP.NET Core](https://docs.microsoft.com/en-us/aspnet/core/?view=aspnetcore-5.0)
-   [React.js](https://reactjs.org/)
-   [Arduino](https://www.arduino.cc/)
-   [Python](https://www.python.org/)

## Getting Started

There is 3 part to the application.

-   IOT-Module to collect data from sensors and control actuators
-   Module to bridge the IOT-Module with the Web-App
-   The wep app.

### Arduino

We use an arduino as the IOT controller to communicate with the sensors and actuators.

For more information [Readme Arduino](iot/arduino/README.md)

### Raspberry Pie

We use an raspberry pie to communicate with the arduino and sync the data with the web application.

For more information [Readme Raspberry](iot/raspberry/README.md)

### Web Application

The web app allow to manage all devices.

For more information [Readme Web App](frontend/README.md)
