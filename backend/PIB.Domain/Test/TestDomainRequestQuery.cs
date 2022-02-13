using MediatR;

namespace Domain.Test;

public class TestDomainRequestQuery: IRequest<string>
{
    public TestDomainRequestQuery(int count)
    {
        this.Count = count;
    }

    public int Count { get; }
}

public class GetDomainQuery : IRequestHandler<TestDomainRequestQuery, string>
{
    public Task<string> Handle(TestDomainRequestQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult($"Result: {request.Count}");
    }
}
