namespace BC.Data.Models
{
    public class Language: BaseModel
    {
        public string Name { get; set; }

        public string Code { get; set; }

        public int Sort { get; set; }

        public string Flag { get; set; }
    }
}
