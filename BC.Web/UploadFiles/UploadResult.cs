using System.Collections.Generic;

namespace BC.Web.UploadFiles
{
    public class UploadResult
    {
        public string FileName { get; set; }

        public List<UploadedFile> UploadedFiles { get; set; }

        public int Status { get; set; }
    }
}