using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Whatsapp_asp.Data;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Whatsapp_aspContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Whatsapp_aspContext") ?? throw new InvalidOperationException("Connection string 'Whatsapp_aspContext' not found.")));

// Add services to the container.
builder.Services.AddControllersWithViews();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Ratings}/{action=Index}/{id?}");

app.Run();
