using MediatR;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using PIB.Infrastructure.Auth;
using PIB.Infrastructure.BlobStorage;
using PIB.Infrastructure.Mongo;

namespace PIB.Domain.Plants.Commands;

public record UploadPlantPictureCommand(User User, Guid PlantId, Stream FileStream, string ContentType) : IRequest<UploadPlantPictureResponse>;

public record UploadPlantPictureResponse(string Etag);

public class UploadPlantPictureCommandHandler : IRequestHandler<UploadPlantPictureCommand, UploadPlantPictureResponse>
{
    private readonly PlantPictureRepository _plantPictureRepository;
    private readonly ILogger<UploadPlantPictureCommandHandler> _logger;
    private MongoRepository _mongoRepository;

    public UploadPlantPictureCommandHandler(MongoRepository mongoRepository, PlantPictureRepository plantPictureRepository, ILogger<UploadPlantPictureCommandHandler> logger)
    {
        this._plantPictureRepository = plantPictureRepository;
        this._logger = logger;
        this._mongoRepository = mongoRepository;
    }


    public async Task<UploadPlantPictureResponse> Handle(UploadPlantPictureCommand command, CancellationToken cancellationToken)
    {
        var etag = await this._plantPictureRepository.UploadPlantPicture(command.PlantId, command.FileStream, command.ContentType);
        
        this._logger.LogInformation("Uploaded with etag {Etag}", etag.ToString());
        
        var collection = this._mongoRepository.GetCollection<PlantDocument>();
        
        await collection.UpdateOneAsync(
            Builders<PlantDocument>.Filter.Eq(x => x.UserId, command.User.Id) &
            Builders<PlantDocument>.Filter.Eq(x => x.PlantId, command.PlantId),
            Builders<PlantDocument>.Update.Set(x => x.Image.Etag, etag.ToString())
            , cancellationToken: cancellationToken);

        return new UploadPlantPictureResponse(etag.ToString());
    }
}
