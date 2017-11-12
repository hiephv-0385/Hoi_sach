namespace BC.Data.Requests
{
    public class BookCategoriesRequest: PagingRequest
    {
        public string ParentId { get; set; }
    }
}
