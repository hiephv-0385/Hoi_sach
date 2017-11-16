﻿using System;
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
                Books = books
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
        [ValidateAntiForgeryToken]
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

            if (value.Images == null)
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
        [ValidateAntiForgeryToken]
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
            book.UpdatedOn = DateTime.Now;

            var updateResult = await _bookRepository.Update(id, book);
            
            await _bookImageRepository.DeleteImagesByBookId(id);
            if (value.Images != null)
            {
                foreach (var img in value.Images)
                {
                    img.BookId = book.Id;
                }
                await _bookImageRepository.AddMany(value.Images);
            }

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public async Task Delete(string id)
        {
            await _bookImageRepository.DeleteImagesByBookId(id);
            await _bookRepository.Remove(id);
        }

        [HttpPost("images")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            var updatedFileNames = await _uploadFile.UploadMany(FolderPath.BookImage, Request.Form);

            return new UploadResult
            {
                FileNames = updatedFileNames,
                Status = 200
            };
        }

        [HttpPost("images/remove")]
        [ValidateAntiForgeryToken]
        public void RemoveAvatar([FromBody]BookAvatar avatar)
        {
            _uploadFile.RemoveFile(avatar.FileName);
            _bookImageRepository.Remove(avatar.ImageId);
        }
    }
}