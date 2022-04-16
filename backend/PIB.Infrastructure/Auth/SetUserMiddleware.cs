using Microsoft.AspNetCore.Http;

namespace PIB.Infrastructure.Auth;

public class UserContextMiddleware
{
    private readonly RequestDelegate _next;

    public UserContextMiddleware(RequestDelegate next)
    {
        this._next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        var identity = context?.User?.Identity;

        if (identity != null && identity.IsAuthenticated && identity.Name != null)
        {
            var user = new User(identity.Name);

            using (UserContext.SetUser(user))
            {
                await this._next(context);
                return;
            }
        }

        await this._next(context);
    }
}
