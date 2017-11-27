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
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;

namespace BookCommunity.Controllers
{
    [Produces("application/json")]
    [Route("api/admin/books")]
    [Authorize(JwtBearerDefaults.AuthenticationScheme)]
    public class AdminBooksController : Controller
    {
        private readonly IBookRepository _bookRepository;
        private readonly IBookImageRepository _bookImageRepository;
        private IUploadFileService _uploadFileService;

        public AdminBooksController(
            IBookRepository bookRepository,
            IBookImageRepository bookImageRepository,
            IUploadFileService uploadFileService)
        {
            _bookRepository = bookRepository;
            _bookImageRepository = bookImageRepository;
            _uploadFileService = uploadFileService;
        }

        [NoCache]
        [HttpGet("search")]
        public async Task<BookListResponse> Get([FromQuery]BookRequest request)
        {
            var books = _bookRepository.Search(request);
            var count = await _bookRepository.CountAll();
            return new BookListResponse
            {
                Count = count,
                Items = books
            };
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null)
            {
                return NotFound();
            }
            var images = await _bookImageRepository.GetImagesByBookId(id);

            return Ok(new StoredBookModel
            {
                Book = book,
                Images = images
            });
        }

        [HttpPost]
        public void Post([FromBody]StoredBookModel value)
        {
            var book = new Book
            {
                Name = value.Book.Name,
                PageCount = value.Book.PageCount,
                PublishedYear = value.Book.PublishedYear,
                Summary = value.Book.Summary,
                BuyAddress = value.Book.BuyAddress,
                Author = value.Book.Author,
                ReleaseCompany = value.Book.ReleaseCompany,
                BookCategory = value.Book.BookCategory,
                Publisher = value.Book.Publisher,
                IsActive = value.Book.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            };

            _bookRepository.Add(book);

            if (value.Images == null || value.Images.ToList().Count <= 0)
            {
                return;
            }
            foreach (var img in value.Images)
            {
                img.BookId = book.Id;
            }
            _bookImageRepository.AddMany(value.Images);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]StoredBookModel value)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null)
            {
                return BadRequest();
            }

            book.Name = value.Book.Name;
            book.PageCount = value.Book.PageCount;
            book.PublishedYear = value.Book.PublishedYear;
            book.Summary = value.Book.Summary;
            book.BuyAddress = value.Book.BuyAddress;
            book.Author = value.Book.Author;
            book.ReleaseCompany = value.Book.ReleaseCompany;
            book.BookCategory = value.Book.BookCategory;
            book.Publisher = value.Book.Publisher;
            book.IsActive = value.Book.IsActive;
            book.UpdatedOn = DateTime.Now;

            var updateResult = await _bookRepository.Update(id, book);
            
            await _bookImageRepository.DeleteImagesByBookId(id);
            if (value.Images != null && value.Images.ToList().Count > 0)
            {
                await _bookImageRepository.AddMany(value.Images);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        public async Task Delete(string id)
        {
            await _bookImageRepository.DeleteImagesByBookId(id);
            await _bookRepository.Remove(id);
        }

        [HttpPost("images")]
        public async Task<UploadResult> Upload()
        {
            var uploadResult = await _uploadFileService.UploadMultiple(FolderPath.BookImage, Request.Form);
            uploadResult.Status = 200;
            uploadResult.FileName = "";

            return uploadResult;
        }

        [HttpPost("images/remove")]
        public void RemoveAvatar([FromBody]BookAvatar avatar)
        {
            _uploadFileService.RemoveFile(avatar.FileName);
            if (!string.IsNullOrEmpty(avatar.ImageId))
            {
                _bookImageRepository.Remove(avatar.ImageId);
            }
        }
    }
}