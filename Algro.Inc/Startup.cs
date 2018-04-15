using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Algro.Inc.Startup))]
namespace Algro.Inc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
