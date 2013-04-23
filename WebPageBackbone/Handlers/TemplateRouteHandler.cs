using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Routing;

namespace WebPageBackbone.Handlers
{
    internal class TemplateHttpHandler : IHttpHandler
    {

        public bool IsReusable
        { 
            get 
            {
                return true; 
            } 
        }
        public RequestContext RequestContext { get; set; }

        public void ProcessRequest(HttpContext context)
        {
            string filename = RequestContext.RouteData.Values["filename"] as string;
            if (string.IsNullOrEmpty(filename))
            {
                context.Response.Clear();
                context.Response.StatusCode = 404;
                context.Response.End();
            }
            else
            {
                context.Response.Clear();
                context.Response.ContentType = "text/template";

                string filepath = context.Server.MapPath("~/Templates/" + filename + ".html");

                context.Response.WriteFile(filepath);
                context.Response.End();
            }
        }
    }

    public class TemplateRouteHandler : IRouteHandler
    {
        public IHttpHandler GetHttpHandler(RequestContext requestContext)
        {
            return new TemplateHttpHandler() { RequestContext = requestContext };
        }
    }
}