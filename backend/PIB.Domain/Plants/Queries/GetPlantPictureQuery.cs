using MediatR;
using PIB.Infrastructure.BlobStorage;

namespace Domain.Plants.Queries;

public record GetPlantPictureQuery(Guid PlantId) : IRequest<PictureResult>;

public record GetPlantPictureUriQuery(Guid PlantId) : IRequest<Uri>;

public record PictureResult(Stream Stream, string mimeType);

public class GetPlantPictureQueryHandler : IRequestHandler<GetPlantPictureQuery, PictureResult>, IRequestHandler<GetPlantPictureUriQuery, Uri>
{
    private readonly PlantPictureRepository _plantPictureRepository;

    public GetPlantPictureQueryHandler(PlantPictureRepository plantPictureRepository)
    {
        this._plantPictureRepository = plantPictureRepository;
    }

    public async Task<PictureResult> Handle(GetPlantPictureQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await this._plantPictureRepository.GetPlantPicture(request.PlantId);
        
            return new PictureResult(result.Content.ToStream() ,result.Details.ContentType);
        }
        catch (Exception e)
        {
            throw new Exception("Not found");
        }
    }

    public async Task<Uri> Handle(GetPlantPictureUriQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await this._plantPictureRepository.GetUrl(request.PlantId);
        
            return result;
        }
        catch (Exception e)
        {
            throw new Exception("Not found");
        }
    }
}
