using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Data.Repositories.Countries;
using BC.Data.Models;
using BC.Data.Requests;
using BC.Web.Filters;
using BC.Web.UploadFiles;
using BC.Web.Constants;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class CountriesController : Controller
    {
        private readonly ICountryRepository _countryRepository;
        private IUploadFile _uploadFile;

        public CountriesController(ICountryRepository countryRepository, IUploadFile uploadFile)
        {
            _countryRepository = countryRepository;
            _uploadFile = uploadFile;
            ViewBag.PageName = "Countries";
        }

        [NoCache]
        [HttpGet]
        public async Task<IEnumerable<Country>> Get([FromQuery]PagingRequest request)
        {
            return await _countryRepository.GetCountries(request);
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var adminUser = await _countryRepository.GetCountry(id);
            if (adminUser == null)
            {
                return NotFound();
            }

            return Ok(adminUser);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Post([FromBody]Country value)
        {
            _countryRepository.AddCountry(new Country
            {
                Name = value.Name,
                Code = value.Code,
                Sort = value.Sort,
                Flag = value.Flag,
                IsActive = value.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Put(string id, [FromBody]Country value)
        {
            var country = await _countryRepository.GetCountry(id);
            if (country == null)
            {
                return BadRequest();
            }

            country.Name = value.Name;
            country.Code = value.Code;
            country.Sort = value.Sort;
            country.Flag = value.Flag;
            country.IsActive = value.IsActive;
            country.UpdatedOn = DateTime.Now;

            var updateResult = await _countryRepository.UpdateCountry(id, country);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _countryRepository.RemoveCountry(id);
        }

        [HttpPost("flags")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFile.Upload(FolderPath.CountryFlag, Request.Form);

            return new UploadResult
            {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("flags/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFile.RemoveFile(avatar.FileName);
        }
    }
}