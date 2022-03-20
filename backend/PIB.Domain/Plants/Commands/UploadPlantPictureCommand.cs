using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.BlobStorage;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record UploadPlantPictureCommand(Guid PlantId, Stream FileStream, string ContentType) : IRequest<UploadPlantPictureResponse>;

public record UploadPlantPictureResponse(string Etag);

public class UploadPlantPictureCommandHandler : IRequestHandler<UploadPlantPictureCommand, UploadPlantPictureResponse>
{
    private readonly PlantPictureRepository _plantPictureRepository;
    private MongoRepository _mongoRepository;

    public UploadPlantPictureCommandHandler(MongoRepository mongoRepository, PlantPictureRepository plantPictureRepository)
    {
        this._plantPictureRepository = plantPictureRepository;
        this._mongoRepository = mongoRepository;
    }


    public async Task<UploadPlantPictureResponse> Handle(UploadPlantPictureCommand command, CancellationToken cancellationToken)
    {
        var etag = await this._plantPictureRepository.UploadPlantPicture(command.PlantId, command.FileStream, command.ContentType);
        
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update.Set(x => x.Image.Etag, etag.ToString())
            , cancellationToken: cancellationToken);

        return new UploadPlantPictureResponse(etag.ToString());
    }
}
