namespace PIB.Infrastructure.Auth;

public class AuthSettings
{
    public const string Auth = "Auth";

    public string Issuer { get; set; } = string.Empty;
    
    public string Audience { get; set; } = string.Empty;
}
