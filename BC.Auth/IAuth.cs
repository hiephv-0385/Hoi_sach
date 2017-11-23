namespace BC.Auth
{
    public interface IAuth
    {
        bool Authenticated(string dbPassword, string password);

        string GenerateToken(string userId);
    }
}
