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
    [Route("api/books")]
    public class BooksController : Controller
    {
        private readonly IBookRepository _bookRepository;
        private readonly IBookImageRepository _bookImageRepository;
        private IUploadFile _uploadFile;

        public BooksController(
            IBookRepository bookRepository,
            IBookImageRepository bookImageRepository,
            IUploadFile uploadFile)
        {
            _bookRepository = bookRepository;
            _bookImageRepository = bookImageRepository;
            _uploadFile = uploadFile;
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
                Data = books,
                Dtos = books
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

            return Ok(book);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Post([FromBody]SavedBookDto value)
        {
            _bookRepository.Add(new Book
            {
                Name = value.Name,
                PageCount = value.PageCount,
                PublishedYear = value.PublishedYear,
                Summary = value.Summary,
                BuyAddress = value.BuyAddress,
                Author = value.Author,
                ReleaseCompany = value.ReleaseCompany,
                BookCategory = value.BookCategory,
                Publisher = value.Publisher,
                IsActive = value.IsActive,
                CreatedOn = DateTime.Now,
                UpdatedOn = DateTime.Now
            });

            _bookImageRepository.AddMany(value.Images);
        }

        [HttpPut("{id}")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Put(string id, [FromBody]Book value)
        {
            var book = await _bookRepository.GetById(id);
            if (book == null)
            {
                return BadRequest();
            }

            book.Name = value.Name;
            book.PageCount = value.PageCount;
            book.PublishedYear = value.PublishedYear;
            book.Summary = value.Summary;
            book.BuyAddress = value.BuyAddress;
            book.Author = value.Author;
            book.ReleaseCompany = value.ReleaseCompany;
            book.BookCategory = value.BookCategory;
            book.Publisher = value.Publisher;
            book.UpdatedOn = DateTime.Now;

            var updateResult = await _bookRepository.Update(id, book);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _bookRepository.Remove(id);
        }

        [HttpPost("images")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFile.Upload(FolderPath.BookImage, Request.Form);

            return new UploadResult
            {
                FileName = updatedFileName,
                Status = 200
            };
        }

        [HttpPost("images/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]Avatar avatar)
        {
            _uploadFile.RemoveFile(avatar.FileName);
        }
    }
}