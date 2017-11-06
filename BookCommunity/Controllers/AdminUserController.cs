using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Web.Repositories.AdminSecurity;
using BC.Infrastructure;
using BC.Infrastructure.Hash;
using BC.Web.Filters;
using BC.Web.Models.AdminUserDomain;
using BC.Web.Models;
using BC.Web.Requests;
using BC.Web.Responses;
using BC.Web.UploadFiles;
using BC.Web.Constants;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AdminUsersController : Controller
    {
        private readonly IAdminUserRepository _adminUserRepository;
        private readonly ICryptography _cryptography;
        private IUploadFile _uploadFile;

        public AdminUsersController(
            IAdminUserRepository adminUserRepository, 
            ICryptography cryptography, 
            IUploadFile uploadFile)
        {
            _adminUserRepository = adminUserRepository;
            _cryptography = cryptography;
            _uploadFile = uploadFile;
        }

        [NoCache]
        [HttpGet]
        public async Task<AdminUserListResponse> Get([FromQuery]PagingRequest request)
        {
            var adminUsers = await _adminUserRepository.GetAdminUsers(request);
            var count = await _adminUserRepository.CountAll();
            return new AdminUserListResponse
            {
                Count =  count,
                Data = adminUsers
            };
        }

        private async Task<IEnumerable<AdminUser>> GetAdminUsersInternal(PagingRequest request)
        {
            return await _adminUserRepository.GetAdminUsers(request); ;
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
        [ValidateAntiForgeryToken]
        public void Post([FromBody]AdminUserDto value)
        {
            _adminUserRepository.AddAdminUser(new AdminUser
            {
                FirstName = value.FirstName,
                LastName = value.LastName,
                Email = value.Email,
                Avatar = value.Avatar,
                Password = _cryptography.Encrypt(value.Password),
                IsActive = value.IsActive,
                IsSupperUser = false,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        // PUT api/adminusers/5
        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Put(string id, [FromBody]UpdateAdminUserDto value)
        {
            var adminUser = await _adminUserRepository.GetAdminUser(id);
            if (adminUser == null)
            {
                return BadRequest();
            }

            adminUser.FirstName = value.FirstName;
            adminUser.LastName = value.LastName;
            adminUser.Avatar = value.Avatar;
            adminUser.IsActive = value.IsActive;
            adminUser.UpdatedOn = DateTime.Now;

            var updateResult = await _adminUserRepository.UpdateAdminUser(id, adminUser);

            return Ok(updateResult);
        }

        // DELETE api/adminusers/23243423
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _adminUserRepository.RemoveAdminUser(id);
        }

        [HttpPost("avatar")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFile.Upload(FolderPath.UserAvatar, Request.Form);

            return new UploadResult {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("avatar/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFile.RemoveFile(avatar.FileName);
        }
    }
}