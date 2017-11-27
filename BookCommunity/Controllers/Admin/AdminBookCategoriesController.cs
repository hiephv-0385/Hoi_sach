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
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/admin/bookCategories")]
    [Authorize(JwtBearerDefaults.AuthenticationScheme)]
    public class AdminBookCategoriesController : Controller
    {
        private readonly IBookCategoryRepository _bookCategoryRepository;
        private IUploadFileService _uploadFileService;

        public AdminBookCategoriesController(IBookCategoryRepository bookCategoryRepository, IUploadFileService uploadFileService)
        {
            _bookCategoryRepository = bookCategoryRepository;
            _uploadFileService = uploadFileService;
        }

        [NoCache]
        [HttpGet]
        public async Task<BookCategoryListResponse> Get([FromQuery]PagingRequest request)
        {
            var categories = await _bookCategoryRepository.GetList(request);
            var count = await _bookCategoryRepository.CountAll();
            return new BookCategoryListResponse
            {
                Count = count,
                Items = categories
            };
        }

        [HttpGet("search")]
        public List<BookCategory> Search([FromQuery]BookCategoriesRequest request)
        {
            return _bookCategoryRepository.Search(request);
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var category = await _bookCategoryRepository.GetById(id);
            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public void Post([FromBody]BookCategory value)
        {
            _bookCategoryRepository.Add(new BookCategory
            {
                Name = value.Name,
                Sort = value.Sort,
                Picture = value.Picture,
                Parent = value.Parent,
                IsActive = value.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]BookCategory value)
        {
            var category = await _bookCategoryRepository.GetById(id);
            if (category == null)
            {
                return BadRequest();
            }

            category.Name = value.Name;
            category.Sort = value.Sort;
            category.Picture = value.Picture;
            category.Parent = value.Parent;
            category.IsActive = value.IsActive;
            category.UpdatedOn = DateTime.Now;

            var updateResult = await _bookCategoryRepository.Update(id, category);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            _bookCategoryRepository.Remove(id);
        }

        [HttpPost("pictures")]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFileService.UploadSigle(FolderPath.BookCategoryPicture, Request.Form);

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