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
    [Route("api/ReleaseCompanies")]
    [Authorize(JwtBearerDefaults.AuthenticationScheme)]
    public class ReleaseCompaniesController : Controller
    {
        private readonly IReleaseCompanyRepository _releaseCompanyRepository;
        private IUploadFileService _uploadFileService;

        public ReleaseCompaniesController(
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
        [ValidateAntiForgeryToken]
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
        [ValidateAntiForgeryToken]
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
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _releaseCompanyRepository.Remove(id);
        }

        [HttpPost("logos")]
        [ValidateAntiForgeryToken]
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
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFileService.RemoveFile(avatar.FileName);
        }
    }
}