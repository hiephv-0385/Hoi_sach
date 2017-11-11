using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
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
    [Route("api/publishers")]
    public class PublishersController : Controller
    {
        private readonly IPublisherRepository _publisherRepository;
        private IUploadFile _uploadFile;

        public PublishersController(IPublisherRepository publisherRepository, IUploadFile uploadFile)
        {
            _publisherRepository = publisherRepository;
            _uploadFile = uploadFile;
        }

        [NoCache]
        [HttpGet]
        public async Task<PublisherListResponse> Get([FromQuery]PagingRequest request)
        {
            var publishers = await _publisherRepository.GetList(request);
            var count = await _publisherRepository.CountAll();
            return new PublisherListResponse
            {
                Count = count,
                Data = publishers
            };
        }

        [HttpGet("{id}")]
        [MongoDbObjectIdFilter]
        public async Task<IActionResult> Get(string id)
        {
            var publisher = await _publisherRepository.GetById(id);
            if (publisher == null)
            {
                return NotFound();
            }

            return Ok(publisher);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public void Post([FromBody]Publisher value)
        {
            _publisherRepository.Add(new Publisher
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
        public async Task<IActionResult> Put(string id, [FromBody]Publisher value)
        {
            var publisher = await _publisherRepository.GetById(id);
            if (publisher == null)
            {
                return BadRequest();
            }

            publisher.Name = value.Name;
            publisher.Logo = value.Logo;
            publisher.Country = value.Country;
            publisher.IsActive = value.IsActive;
            publisher.UpdatedOn = DateTime.Now;

            var updateResult = await _publisherRepository.Update(id, publisher);

            return Ok(updateResult);
        }

        [HttpDelete("{id}")]
        [ValidateAntiForgeryToken]
        public void Delete(string id)
        {
            _publisherRepository.Remove(id);
        }

        [HttpPost("logos")]
        [ValidateAntiForgeryToken]
        public async Task<UploadResult> Upload()
        {
            string updatedFileName = await _uploadFile.Upload(FolderPath.PublisherLogo, Request.Form);

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
            _uploadFile.RemoveFile(avatar.FileName);
        }
    }
}