using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace BC.Web.UploadFiles
{
    public class UploadFileService: IUploadFileService
    {
        private IHostingEnvironment _env;

        public UploadFileService(IHostingEnvironment env)
        {
            _env = env;
        }

        public async Task<string> UploadSigle(string folderName, IFormCollection form)
        {
            string fullPath = Path.Combine(_env.WebRootPath, folderName);
            var files = form.Files;
            if (Directory.Exists(fullPath) == false)
            {
                Directory.CreateDirectory(fullPath);
            }

            if (files == null || files.Count == 0)
            {
                return string.Empty;
            }

            return await SaveFile(fullPath, folderName, files[0]);
        }

        public async Task<UploadResult> UploadMultiple(string folderName, IFormCollection form)
        {
            List<UploadedFile> uploadedFiles = new List<UploadedFile>();
            string fullPath = Path.Combine(_env.WebRootPath, folderName);
            var files = form.Files;
            if (Directory.Exists(fullPath) == false)
            {
                Directory.CreateDirectory(fullPath);
            }

            foreach (var file in files)
            {
                string filePath = await SaveFile(fullPath, folderName, file);
                uploadedFiles.Add(new UploadedFile
                {
                    Id = "",
                    FileName = filePath
                });
            }

            return new UploadResult
            {
                UploadedFiles = uploadedFiles
            };
        }

        public void RemoveFile(string fileName)
        {
            string fullPath = Path.Combine(_env.WebRootPath, fileName);
            FileInfo file = new FileInfo(fullPath);
            if (file.Exists)
            {
                file.Delete();
            }
        }

        private async Task<string> SaveFile(string rootPath, string folderName, IFormFile file)
        {
            if (file.Length <= 0 || string.IsNullOrEmpty(file.FileName))
            {
                return string.Empty;
            }

            var destinationPath = Path.Combine(rootPath, file.FileName);
            string filePath = string.Format("{0}/{1}", folderName, file.FileName);
            using (var stream = new FileStream(destinationPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return filePath;
        }
    }
}
