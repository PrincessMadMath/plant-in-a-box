using System.Collections;
using System.Collections.Immutable;
using MongoDB.Driver;
using MongoDB.Driver.Core.Misc;

namespace PIB.Infrastructure.Mongo;

public static class MongoOperations
{
    
    /// <summary>Get the first result or null. (support nullable type)</summary>
    /// <typeparam name="TDocument">The type of the document.</typeparam>
    /// <typeparam name="TProjection">The type of the projection (same as TDocument if there is no projection).</typeparam>
    /// <param name="find">The fluent find.</param>
    /// <param name="cancellationToken">The cancellation token.</param>
    /// <returns>A Task whose result is the first result or null.</returns>
    public static async Task<TProjection?> FirstOrDefaultNullableAsync<TDocument, TProjection>(
        this IFindFluent<TDocument, TProjection> find,
        CancellationToken cancellationToken = default)
    {
        var value = await find.FirstOrDefaultAsync(cancellationToken) ;

        if (value == null)
        {
            return default(TProjection);
        }

        return value;
    }
    
    public static IAsyncEnumerable<TDocument> ToAsyncEnumerable<TDocument>(
        this IAsyncCursorSource<TDocument> source,
        CancellationToken cancellationToken = default (CancellationToken))
    {
        return AsyncEnumerable.Create(
                token =>
                {
                    IAsyncCursor<TDocument>? cursor = null;

                    async ValueTask<bool> MoveNextAsync()
                    {
                        cursor ??= await source.ToCursorAsync(cancellationToken);

                        return await cursor.MoveNextAsync(token);
                    }

                    return AsyncEnumerator.Create(
                        MoveNextAsync,
                        () => cursor?.Current ?? ImmutableList<TDocument>.Empty,
                        () =>
                        {
                            cursor?.Dispose();
                            return default;
                        });
                })
            .SelectMany(x => x.ToAsyncEnumerable());
    }
    
}
