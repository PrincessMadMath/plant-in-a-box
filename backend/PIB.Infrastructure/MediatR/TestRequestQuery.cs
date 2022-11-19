using MediatR;
using MongoDB.Driver;
using PIB.Infrastructure.Mongo;

namespace PIB.Infrastructure.MediatR;

public class TestRequestQuery: IRequest<TestDocument>
{
    public TestRequestQuery(int count)
    {
        this.Count = count;
    }

    public int Count { get; }
}

public class TestQueryHandler : IRequestHandler<TestRequestQuery, TestDocument>
{
    private readonly MongoRepository _mongoRepository;

    public TestQueryHandler(MongoRepository mongoRepository)
    {
        this._mongoRepository = mongoRepository;
    }
    
    public async Task<TestDocument> Handle(TestRequestQuery request, CancellationToken cancellationToken)
    {
        var result = await this._mongoRepository.GetCollection<TestDocument>().Find(Builders<TestDocument>.Filter.Empty).ToListAsync(cancellationToken: cancellationToken);

        var first = result?.FirstOrDefault();

        if (first == null)
        {
            throw new Exception("Not found.");
        }

        return first;
    }
}

[MongoCollection("test")]
public class TestDocument : MongoDocument
{
    public string Name { get; set; } = String.Empty;
}
