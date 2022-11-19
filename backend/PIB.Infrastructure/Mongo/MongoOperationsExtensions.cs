using System.Collections.Immutable;
using System.Runtime.CompilerServices;
using MongoDB.Driver;

namespace PIB.Infrastructure.Mongo;

public static class MongoOperationsExtensions
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

    public static async IAsyncEnumerable<TDocument> ToAsyncEnumerable<TDocument>
    (this IAsyncCursor<TDocument> cursor,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        if (cursor == null)
        {
            throw new ArgumentNullException(nameof(cursor));
        }

        while (await cursor.MoveNextAsync(cancellationToken))
        {
            foreach (var document in cursor.Current)
            {
                yield return document;
            }
        }
    }
    
    public static async IAsyncEnumerable<TDocument> ToAsyncEnumerable<TDocument>
    (this IAsyncCursorSource<TDocument> source,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        if (source == null)
        {
            throw new ArgumentNullException(nameof(source));
        }

        using var cursor = await source.ToCursorAsync(cancellationToken);

        while (await cursor.MoveNextAsync(cancellationToken))
        {
            foreach (var document in cursor.Current)
            {
                yield return document;
            }
        }
    }

}
