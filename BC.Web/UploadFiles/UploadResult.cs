using System.Collections.Generic;

namespace BC.Web.UploadFiles
{
    public class UploadResult
    {
        public string FileName { get; set; }

        public List<string> FileNames { get; set; }

        public int Status { get; set; }
    }
}