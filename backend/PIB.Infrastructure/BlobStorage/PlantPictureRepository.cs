using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Microsoft.Extensions.Options;

namespace PIB.Infrastructure.BlobStorage;

public class PlantPictureRepository
{
    private readonly IOptions<BlobStorageSettings> _blobOption;
    private readonly BlobServiceClient _blobServiceClient;
    private BlobContainerClient? _plantContainerClient;

    public PlantPictureRepository(IOptions<BlobStorageSettings> blobOption)
    {
        this._blobOption = blobOption;
        this._blobServiceClient = new BlobServiceClient(blobOption.Value.ConnectionString);
    }

    private async Task<BlobContainerClient> GetPlantContainer()
    {
        if (this._plantContainerClient != null)
        {
            return this._plantContainerClient;
        }

        this._plantContainerClient = this._blobServiceClient.GetBlobContainerClient(this._blobOption.Value.PlantPictureContainer);

        await this._plantContainerClient.CreateIfNotExistsAsync();
        return this._plantContainerClient;
    }

    public async Task UploadPlantPicture(Guid plantId, Stream stream, string contentType)
    {
        var plantContainer = await this.GetPlantContainer();


        var blobClient = plantContainer.GetBlobClient(GetPlantPictureName(plantId));
        var blobHttpHeader = new BlobHttpHeaders();
        blobHttpHeader.ContentType = contentType;
        
        var info = await blobClient.UploadAsync(stream, blobHttpHeader);
    }
    
    public async Task<BlobDownloadResult> GetPlantPicture(Guid plantId)
    {
        var plantContainer = await this.GetPlantContainer();
        
            var blobClient = plantContainer.GetBlobClient(GetPlantPictureName(plantId));
            var result = await blobClient.DownloadContentAsync();
            return result.Value;
        }

    private static string GetPlantPictureName(Guid plantId)
    {
        return $"plant_{plantId}";
    }
}
