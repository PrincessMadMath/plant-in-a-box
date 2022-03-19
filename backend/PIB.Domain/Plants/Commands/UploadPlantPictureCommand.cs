using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.BlobStorage;
using PIB.Infrastructure.Mongo;

namespace Domain.Plants.Commands;

public record UploadPlantPictureCommand(Guid PlantId, Stream FileStream, string ContentType) : IRequest<bool>;

public class UploadPlantPictureCommandHandler : IRequestHandler<UploadPlantPictureCommand, bool>
{
    private readonly PlantPictureRepository _plantPictureRepository;

    public UploadPlantPictureCommandHandler(PlantPictureRepository plantPictureRepository)
    {
        this._plantPictureRepository = plantPictureRepository;
    }


    public async Task<bool> Handle(UploadPlantPictureCommand command, CancellationToken cancellationToken)
    {
        await this._plantPictureRepository.UploadPlantPicture(command.PlantId, command.FileStream, command.ContentType);
        
        return true;
    }
}
