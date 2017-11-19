using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using System.Security.Cryptography;
using System.Text;

namespace BC.Infrastructure.Hash
{
    public class Cryptography: ICryptography
    {
        public string Encrypt(string text)
        {
			byte[] bytes = Encoding.Unicode.GetBytes(text);
            SHA256 shaM = new SHA256Managed();
            byte[] inArray = shaM.ComputeHash(bytes);

            return Convert.ToBase64String(inArray);
        }

        public string GenerateToken(string text)
        {
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: text,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));
        }
    }
}
