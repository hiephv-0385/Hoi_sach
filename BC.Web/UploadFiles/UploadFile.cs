using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace BC.Web.UploadFiles
{
    public class UploadFile: IUploadFile
    {
        private IHostingEnvironment _env;

        public UploadFile(IHostingEnvironment env)
        {
            _env = env;
        }

        public async Task<string> Upload(string folderName, IFormCollection form)
        {
            string updatedFileName = "";
            string fullPath = Path.Combine(_env.WebRootPath, folderName);
            var files = form.Files;
            if (Directory.Exists(fullPath) == false)
            {
                Directory.CreateDirectory(fullPath);
            }

            foreach (var file in files)
            {
                if (file.Length <= 0)
                {
                    continue;
                }

                var destinationPath = Path.Combine(fullPath, file.FileName);
                using (var stream = new FileStream(destinationPath, FileMode.Create))
                {
                    updatedFileName = file.FileName;
                    await file.CopyToAsync(stream);
                }
            }

            return string.Format("{0}/{1}", folderName, updatedFileName);
        }

        public async Task<List<string>> UploadMany(string folderName, IFormCollection form)
        {
            List<string> updatedFileNames = new List<string>();
            string fullPath = Path.Combine(_env.WebRootPath, folderName);
            var files = form.Files;
            if (Directory.Exists(fullPath) == false)
            {
                Directory.CreateDirectory(fullPath);
            }

            foreach (var file in files)
            {
                if (file.Length <= 0)
                {
                    continue;
                }

                var destinationPath = Path.Combine(fullPath, file.FileName);
                using (var stream = new FileStream(destinationPath, FileMode.Create))
                {
                    string filePath = string.Format("{0}/{1}", folderName, file.FileName);
                    updatedFileNames.Add(filePath);
                    await file.CopyToAsync(stream);
                }
            }

            return updatedFileNames;
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
    }
}
