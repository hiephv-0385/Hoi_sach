using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using BC.Data.Repositories;
using BC.Web.UploadFiles;
using BC.Web.Filters;
using BC.Data.Responses;
using BC.Data.Requests;
using BC.Data.Models;
using BC.Web.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/admin/authors")]
    [Authorize(JwtBearerDefaults.AuthenticationScheme)]
    public class AdminAuthorsController : Controller
    {
        private readonly IAuthorRepository _authorRepository;
        private IUploadFileService _uploadFileService;

        public AdminAuthorsController(IAuthorRepository authorRepository, IUploadFileService uploadFileService)
        {
            _authorRepository = authorRepository;
            _uploadFileService = uploadFileService;
        }

        [NoCache]
        [HttpGet]
        public async Task<AuthorListResponse> Get([FromQuery]PagingRequest request)
        {
            var countries = await _authorRepository.GetList(request);
            var count = await _authorRepository.CountAll();

            return new AuthorListResponse
            {
                Count = count,
                Items = countries
            };
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var author = await _authorRepository.GetById(id);
            if (author == null)
            {
                return NotFound();
            }

            return Ok(author);
        }

        [HttpPost]
        public void Post([FromBody]Author value)
        {
            _authorRepository.Add(new Author
            {
                FullName = value.FullName,
                Birthday = value.Birthday,
                Introduction = value.Introduction,
                Picture = value.Picture,
                Country = value.Country,
                IsActive = value.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]Author value)
        {
            var author = await _authorRepository.GetById(id);
            if (author == null)
            {
                return BadRequest();
            }

            author.FullName = value.FullName;
            author.Birthday = value.Birthday;
            author.Introduction = value.Introduction;
            author.Picture = value.Picture;
            author.Country = value.Country;
            author.IsActive = value.IsActive;
            author.UpdatedOn = DateTime.Now;

            var updateResult = await _authorRepository.Update(id, author);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _authorRepository.Remove(id);
        }

        [HttpPost("pictures")]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFileService.UploadSigle(FolderPath.AuthorPicture, Request.Form);

            return new UploadResult
            {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("pictures/remove")]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFileService.RemoveFile(avatar.FileName);
        }
    }
}