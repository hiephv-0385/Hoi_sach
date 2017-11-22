using BC.Data.Models;
using BC.Data.Repositories;
using BC.Infrastructure.Hash;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System;
using System.Text;
using System.Security.Claims;
using Newtonsoft.Json;
using Microsoft.Extensions.Options;

namespace BC.Auth
{
    public class Auth: IAuth
    {
        private readonly IAdminUserRepository _adminUserRepository;
        private readonly ICryptography _cryptography;
        private readonly JwtTokenOptions _tokenOption;

        public Auth(
            IAdminUserRepository adminUserRepository, 
            ICryptography cryptography,
            IOptions<JwtTokenOptions> tokenOption
        )
        {
            _adminUserRepository = adminUserRepository;
            _cryptography = cryptography;
            _tokenOption = tokenOption.Value;
        }

        public bool Authenticated(string dbPassword, string password)
        {
            return _cryptography.Encrypt(password).Equals(dbPassword);
        }

        public async Task RememberMe(AdminUser adminUser, string token)
        {
            adminUser.RememberToken = token;
            await _adminUserRepository.Update(adminUser.Id, adminUser);
        }

        public void Logout()
        {

        }

        public string GenerateToken(string userId)
        {
            var now = DateTime.UtcNow;
            var claims = new Claim[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUniversalTime().ToString(), ClaimValueTypes.Integer64)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_tokenOption.Key));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _tokenOption.Issuer,
                audience: _tokenOption.Issuer,
                claims: claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(5)),
                signingCredentials: creds
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);

            //var response = new
            //{
            //    access_token = encodedJwt,
            //    expires_in = (int)TimeSpan.FromMinutes(5).TotalSeconds,
            //};

            //return JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented });
            return encodedJwt;
        }

        private bool IsLogged(AdminUser adminUser, UseCredential authUser)
        {
            var isLogged = _cryptography.Encrypt(adminUser.Password).Equals(adminUser.Password);

            return _cryptography.Encrypt(adminUser.Password).Equals(adminUser.Password);
        }
    }
}
