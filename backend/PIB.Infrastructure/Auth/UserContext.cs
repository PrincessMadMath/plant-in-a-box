using System.Security.Principal;

namespace PIB.Infrastructure.Auth;

public record User(string Id);

public static class UserContext
{
    private static readonly AsyncLocal<User> Data = new AsyncLocal<User>();

    public static User CurrentUser => Data.Value ?? new User(String.Empty);

    public static IDisposable SetUser(User user)
    {
        Data.Value = user;

        return new DisposeCurrentTenant();
    }

    private class DisposeCurrentTenant
        : IDisposable
    {
        public void Dispose()
        {
            Data.Value =new User(string.Empty);
        }
    }
}
