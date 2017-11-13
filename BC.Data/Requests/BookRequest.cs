namespace BC.Data.Requests
{
    public class BookRequest: PagingRequest
    {
        public string Name { get; set; }

        public string CategoryId { get; set; }
    }
}
