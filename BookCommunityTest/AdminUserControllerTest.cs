using System.Collections.Generic;
using Xunit;
using Moq;
using System.Threading.Tasks;
using BookCommunity.Controllers;
using BC.Web.Repositories.AdminSecurity;
using BC.Infrastructure.Hash;
using BC.Web.Models.AdminUserDomain;
using System.Linq;
using BC.Web.Requests;
using BC.Web.UploadFiles;

namespace BookCommunityTest
{
    public class AdminUserControllerTest
    {
        private Mock<IAdminUserRepository> _mockRepo;
        private Mock<ICryptography> _mockCryptography;
        private Mock<IUploadFile> _mockUploadFile;

        public AdminUserControllerTest()
        {
            _mockRepo = new Mock<IAdminUserRepository>();
            _mockCryptography = new Mock<ICryptography>();
            _mockUploadFile = new Mock<IUploadFile>();
        }

        [Fact]
        public async Task GetAllAdminUsersTest()
        {
            var request = new PagingRequest
            {
                Offset = 0,
                Limit = 1
            };
            _mockRepo.Setup(repo => repo.GetAdminUsers(request)).Returns(Task.FromResult(GetTestAdminUsers()));

            var controller = new AdminUsersController(_mockRepo.Object, _mockCryptography.Object, _mockUploadFile.Object);

            var result = await controller.Get(request);

            // Assert
            var allAdminUsers = result.Data?.ToList();
            Assert.Equal(2, allAdminUsers?.Count);

            Assert.Equal("test1@example.com", allAdminUsers[0].Email);
            Assert.Equal("test2@example.com", allAdminUsers[1].Email);
        }

        [Fact]
        public async Task GetDetailAdminUserTest()
        {
            const string id = "59eae2c942c913751fecc202";

            var controller = new AdminUsersController(_mockRepo.Object, _mockCryptography.Object, _mockUploadFile.Object);

            var result = await controller.Get(id);
        }

        private IEnumerable<AdminUser> GetTestAdminUsers()
        {
            var users = new List<AdminUser>();
            users.Add(new AdminUser
            {
                Email = "test1@example.com"
            });

            users.Add(new AdminUser
            {
                Email = "test2@example.com"
            });

            return users;
        }

        private AdminUser GetTestOneAdminUser(string id)
        {
            return new AdminUser
            {
                FirstName = "Tran",
                LastName = "Thi Thuy",
                Email = "thuytran@gmail.com",
                Password = "123456",
                IsSupperUser = false,
                Id = id,
                IsActive = true
            };
        }
    }
}
