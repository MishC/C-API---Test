using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.HttpsPolicy;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();
builder.Services.AddCors(
    options=>{
    options.AddPolicy("MyCorsPolicy", policy=> 
   { policy.WithOrigins("http://localhost:3000")
    .AllowAnyHeader().AllowAnyMethod(); 
   });
   });



var app = builder.Build();
app.UseCors("MyCorsPolicy");


// Configure the HTTP request pipeline.
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapRazorPages();

app.Run();
