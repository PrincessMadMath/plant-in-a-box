// See https://aka.ms/new-console-template for more information

using PlasticPlant.Faker;

Console.WriteLine("Hello, World!");

var faker = new FakerService(new HttpClient());

await faker.SeedGrowthLightActuators();