using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using BC.Data.Models;
using BC.Data.Repositories;
using BC.Infrastructure.Hash;
using BC.Web.Filters;
using FluentValidation.AspNetCore;
using FluentValidation;
using BC.Data.Validations;
using BC.Web.Middlewares;
using BC.Web.UploadFiles;
using BC.Data.Repositories.Countries;

namespace BookCommunity
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddAntiforgery(options => options.HeaderName = "X-XSRF-TOKEN");

            services.AddMvc(opt => {
                opt.Filters.Add(typeof(ValidatorActionFilter));
            }).AddFluentValidation();

            services.Configure<Settings>(options =>
            {
                options.ConnectionString = Configuration.GetSection("MongoConnection:ConnectionString").Value;
                options.Database = Configuration.GetSection("MongoConnection:Database").Value;
            });

            RegisterContainers(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors("CorsPolicy");

            app.UseAntiforgeryToken();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            var angularRoutes = new[] {
                 "/dashboard"
             };

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Admin", action = "Index" });
            });
        }

        private void RegisterContainers(IServiceCollection services)
        {
            services.AddTransient<IAdminUserRepository, AdminUserRepository>();

            services.AddTransient<ICountryRepository, CountryRepository>();

            services.AddTransient<ICryptography, Cryptography>();

            services.AddTransient<IUploadFile, UploadFile>();

            services.AddTransient<IValidator<AdminUserDto>, CreateAdminUserValidator>();

            services.AddTransient<IValidator<UpdateAdminUserDto>, UpdateAdminUserValidator>();

            services.AddTransient<IValidator<Country>, CountryValidator>();
        }
    }
}
