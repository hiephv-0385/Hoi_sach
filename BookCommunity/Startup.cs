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
using BC.Data;

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
            services.AddTransient(typeof(IBCContext<>), typeof(BCContext<>));

            services.AddTransient(typeof(IBaseRepository<>), typeof(BaseRepository<>));

            services.AddTransient<IAdminUserRepository, AdminUserRepository>();

            services.AddTransient<ICountryRepository, CountryRepository>();

            services.AddTransient<IAuthorRepository, AuthorRepository>();

            services.AddTransient<IReleaseCompanyRepository, ReleaseCompanyRepository>();

            services.AddTransient<IPublisherRepository, PublisherRepository>();

            services.AddTransient<IBookCategoryRepository, BookCategoryRepository>();

            services.AddTransient<IBookRepository, BookRepository>();

            services.AddTransient<IBookImageRepository, BookImageRepository>();

            services.AddTransient<ICryptography, Cryptography>();

            services.AddTransient<IUploadFile, UploadFile>();

            services.AddTransient<IValidator<AdminUserDto>, CreateAdminUserValidator>();

            services.AddTransient<IValidator<UpdateAdminUserDto>, UpdateAdminUserValidator>();

            services.AddTransient<IValidator<Country>, CountryValidator>();

            services.AddTransient<IValidator<Author>, AuthorValidator>();

            services.AddTransient<IValidator<ReleaseCompany>, ReleaseCompanyValidator>();

            services.AddTransient<IValidator<Publisher>, PublisherValidator>();

            services.AddTransient<IValidator<BookCategory>, BookCategoryValidator>();
        }
    }
}
