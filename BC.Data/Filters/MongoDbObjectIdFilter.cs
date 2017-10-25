using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System;

namespace BC.Data.Filters
{
    public class MongoDbObjectIdFilter: Attribute, IActionFilter
    {
        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            const int ObjectIdLength = 24;

            var objectId = filterContext.RouteData.Values["id"] as string;
            if (!string.IsNullOrEmpty(objectId) && objectId.Length != ObjectIdLength)
            {
                filterContext.Result = new BadRequestObjectResult("Id must be 24 character");
            }
        }

        public void OnActionExecuted(ActionExecutedContext filterContext)
        {

        }
    }
}
