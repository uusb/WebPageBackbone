using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Routing;
using Microsoft.AspNet.FriendlyUrls;
using System.Web.Http;
using WebPageBackbone.Handlers;

namespace WebPageBackbone
{
    public static class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            routes.MapPageRoute("Default", "", "~/Index.aspx");
            routes.Add("TemplateRoute", new Route("template/{filename}", new TemplateRouteHandler()));
            routes.EnableFriendlyUrls();
        }
    }
}
