using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Data.Repositories;
using BC.Infrastructure.Hash;
using BC.Web.Filters;
using BC.Data.Models;
using BC.Data.Requests;
using BC.Data.Responses;
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
        private IUploadFileService _uploadFileSerivce;

        public AdminUsersController(
            IAdminUserRepository adminUserRepository, 
            ICryptography cryptography, 
            IUploadFileService uploadFileSerivce)
        {
            _adminUserRepository = adminUserRepository;
            _cryptography = cryptography;
            _uploadFileSerivce = uploadFileSerivce;
            ViewBag.PageName = "Users";
        }

        [NoCache]
        [HttpGet]
        public async Task<AdminUserListResponse> Get([FromQuery]PagingRequest request)
        {
            var adminUsers = await _adminUserRepository.GetList(request);
            var count = await _adminUserRepository.CountAll();
            return new AdminUserListResponse
            {
                Count =  count,
                Items = adminUsers
            };
        }

        private async Task<IEnumerable<AdminUser>> GetAdminUsersInternal(PagingRequest request)
        {
            return await _adminUserRepository.GetList(request); ;
        }

        // GET api/adminusers/5
        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var adminUser = await _adminUserRepository.GetById(id);
            if (adminUser == null)
            {
                return NotFound();
            }

            return Ok(adminUser);
        }

        private async Task<AdminUser> GetAdminUserByIdInternal(string id)
        {
            return await _adminUserRepository.GetById(id) ?? new AdminUser();
        }

        // POST api/adminusers
        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Post([FromBody]AdminUserModel value)
        {
            _adminUserRepository.Add(new AdminUser
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
        public async Task<IActionResult> Put(string id, [FromBody]UpdateAdminUserModel value)
        {
            var adminUser = await _adminUserRepository.GetById(id);
            if (adminUser == null)
            {
                return BadRequest();
            }

            adminUser.FirstName = value.FirstName;
            adminUser.LastName = value.LastName;
            adminUser.Avatar = value.Avatar;
            adminUser.IsActive = value.IsActive;
            adminUser.UpdatedOn = DateTime.Now;

            var updateResult = await _adminUserRepository.Update(id, adminUser);

            return Ok(updateResult);
        }

        // DELETE api/adminusers/23243423
        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _adminUserRepository.Remove(id);
        }

        [HttpPost("avatars")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFileSerivce.UploadSigle(FolderPath.UserAvatar, Request.Form);

            return new UploadResult {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("avatars/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFileSerivce.RemoveFile(avatar.FileName);
        }
    }
}