using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Domain.Plants;

namespace PIB.PlasticPlant.Faker;

public class FakerService
{
    private readonly HttpClient _client;
    
    public FakerService(HttpClient client)
    {
        this._client = client;
    }

    public async Task SeedGrowthLightActuators()
    {
        foreach (var actuator in Seeds.GrowthLightSeeds)
        {
            var jsonContent = JsonSerializer.Serialize(actuator);
            var requestContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
            
            var response = await this._client.PostAsync(
                new Uri("https://localhost:7196/growth-light/register"), 
                requestContent);

            response.EnsureSuccessStatusCode();

            Console.WriteLine($"Actuator {actuator.Id} was registered successfully.");
        }
    }

    public async Task SeedPlants()
    {
        // foreach (var createPlantCommand in Seeds.CreatePlantsSeeds)
        // {
        //     var jsonContent = JsonSerializer.Serialize(createPlantCommand);
        //     var requestContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");
        //     
        //     var response = await this._client.PostAsync(
        //         new Uri("https://localhost:7196/plants/create"), 
        //         requestContent);
        //
        //     response.EnsureSuccessStatusCode();
        //
        //     var content = await response.Content.ReadFromJsonAsync<PlantDocument>();
        //
        //     if (content != null)
        //     {
        //         Console.WriteLine($"Plant {content.PlantId} was registered successfully.");
        //     }
        //     else
        //     {
        //         Console.WriteLine($"Error while creating plant: {response.StatusCode}.");
        //     }
        // }
    }
}
