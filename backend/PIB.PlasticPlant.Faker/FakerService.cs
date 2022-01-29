using System.Text;
using System.Text.Json;

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
        foreach (var actuator in Seeds.growthLightSeeds)
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

    public Task SeedSoilMoistureSensors()
    {
        return Task.CompletedTask;
    }
}