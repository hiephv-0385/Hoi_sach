using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace BC.Web.UploadFiles
{
    public interface IUploadFileService
    {
        Task<string> UploadSigle(string folderName, IFormCollection form);

        Task<UploadResult> UploadMultiple(string folderName, IFormCollection form);

        void RemoveFile(string fileName);
    }
}
