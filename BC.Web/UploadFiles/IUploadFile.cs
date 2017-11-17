using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BC.Web.UploadFiles
{
    public interface IUploadFile
    {
        Task<string> Upload(string folderName, IFormCollection form);

        Task<UploadResult> UploadMany(string folderName, IFormCollection form);

        void RemoveFile(string fileName);
    }
}
