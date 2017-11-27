using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Web.Filters;
using BC.Data.Repositories;
using BC.Web.UploadFiles;
using BC.Data.Requests;
using BC.Data.Responses;
using BC.Data.Models;
using BC.Web.Constants;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/admin/releaseCompanies")]
    [Authorize(JwtBearerDefaults.AuthenticationScheme)]
    public class AdminReleaseCompaniesController : Controller
    {
        private readonly IReleaseCompanyRepository _releaseCompanyRepository;
        private IUploadFileService _uploadFileService;

        public AdminReleaseCompaniesController(
            IReleaseCompanyRepository releaseCompanyRepository, 
            IUploadFileService uploadFileService)
        {
            _releaseCompanyRepository = releaseCompanyRepository;
            _uploadFileService = uploadFileService;
        }

        [NoCache]
        [HttpGet]
        public async Task<ReleaseCompanyListResponse> Get([FromQuery]PagingRequest request)
        {
            var releaseCompanies = await _releaseCompanyRepository.GetList(request);
            var count = await _releaseCompanyRepository.CountAll();
            return new ReleaseCompanyListResponse
            {
                Count = count,
                Items = releaseCompanies
            };
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var releaseCompany = await _releaseCompanyRepository.GetById(id);
            if (releaseCompany == null)
            {
                return NotFound();
            }

            return Ok(releaseCompany);
        }

        [HttpPost]
        public void Post([FromBody]ReleaseCompany value)
        {
            _releaseCompanyRepository.Add(new ReleaseCompany
            {
                Name = value.Name,
                Logo = value.Logo,
                Country = value.Country,
                IsActive = value.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]ReleaseCompany value)
        {
            var releaseCompany = await _releaseCompanyRepository.GetById(id);
            if (releaseCompany == null)
            {
                return BadRequest();
            }

            releaseCompany.Name = value.Name;
            releaseCompany.Logo = value.Logo;
            releaseCompany.Country = value.Country;
            releaseCompany.IsActive = value.IsActive;
            releaseCompany.UpdatedOn = DateTime.Now;

            var updateResult = await _releaseCompanyRepository.Update(id, releaseCompany);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _releaseCompanyRepository.Remove(id);
        }

        [HttpPost("logos")]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFileService.UploadSigle(FolderPath.ReleaseCompanyLogo, Request.Form);

            return new UploadResult
            {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("logos/remove")]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFileService.RemoveFile(avatar.FileName);
        }
    }
}