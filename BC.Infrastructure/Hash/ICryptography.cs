namespace BC.Infrastructure.Hash
{
    public interface ICryptography
    {
        string Encrypt(string text);

        string GenerateToken(string text);
    }
}
