using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace WebPageBackbone
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/core").Include(
                "~/Scripts/Core/jquery-1.9.1.js",
                "~/Scripts/Core/json2.js",
                "~/Scripts/Core/underscore.js",
                "~/Scripts/Core/backbone.js"));
        }
    }
}