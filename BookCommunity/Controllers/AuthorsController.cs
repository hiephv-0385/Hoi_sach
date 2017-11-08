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

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AuthorsController : Controller
    {
        private readonly IAuthorRepository _authorRepository;
        private IUploadFile _uploadFile;

        public AuthorsController(IAuthorRepository authorRepository, IUploadFile uploadFile)
        {
            _authorRepository = authorRepository;
            _uploadFile = uploadFile;
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
                Data = countries
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
        [ValidateAntiForgeryToken]
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
        [ValidateAntiForgeryToken]
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
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _authorRepository.Remove(id);
        }

        [HttpPost("pictures")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFile.Upload(FolderPath.AuthorPicture, Request.Form);

            return new UploadResult
            {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("pictures/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFile.RemoveFile(avatar.FileName);
        }
    }
}