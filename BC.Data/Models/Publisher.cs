using BC.Web.Models.CountryDomain;

namespace BC.Web.Models
{
    public class Publisher: BaseModel
    {
        public string Name { get; set; }

        public string Logo { get; set; }

        public Country Country { get; set; }
    }
}
