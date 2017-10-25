using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Data.Repositories.AdminSecurity;
using BC.Infrastructure;
using BC.Infrastructure.Hash;
using BC.Data.Filters;
using BC.Data.Models.AdminUserDomain;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminUsersController : Controller
    {
        private readonly IAdminUserRepository _adminUserRepository;
        private readonly ICryptography _cryptography;

        public AdminUsersController(IAdminUserRepository adminUserRepository, ICryptography cryptography)
        {
            _adminUserRepository = adminUserRepository;
            _cryptography = cryptography;
        }

        [NoCache]
        [HttpGet]
        public Task<IEnumerable<AdminUser>> Get()
        {
            return GetAdminUsersInternal();
        }

        private async Task<IEnumerable<AdminUser>> GetAdminUsersInternal()
        {
            return await _adminUserRepository.GetAllAdminUsers();
        }

        // GET api/adminusers/5
        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var adminUser = await _adminUserRepository.GetAdminUser(id);
            if (adminUser == null)
            {
                return NotFound();
            }

            return Ok(adminUser);
        }

        private async Task<AdminUser> GetAdminUserByIdInternal(string id)
        {
            return await _adminUserRepository.GetAdminUser(id) ?? new AdminUser();
        }

        // POST api/adminusers
        [HttpPost]
        public void Post([FromBody]AdminUserDto value)
        {
            _adminUserRepository.AddAdminUser(new AdminUser
            {
                FirstName = value.FirstName,
                LastName = value.LastName,
                Email = value.Email,
                Password = _cryptography.Encrypt(value.Password),
                IsSupperUser = false,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        // PUT api/adminusers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]AdminUser value)
        {
            var adminUser = await _adminUserRepository.GetAdminUser(id);
            if (adminUser == null)
            {
                return BadRequest();
            }

            adminUser.FirstName = value.FirstName;
            adminUser.LastName = value.LastName;
            adminUser.Avartar = value.Avartar;
            adminUser.IsActive = value.IsActive;
            adminUser.UpdatedOn = DateTime.Now;

            var updateResult = await _adminUserRepository.UpdateAdminUser(id, adminUser);

            return Ok(updateResult);
        }

        // DELETE api/adminusers/23243423
        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _adminUserRepository.RemoveAdminUser(id);
        }
    }
}