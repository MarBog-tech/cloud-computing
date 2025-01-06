using backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

var builder = WebApplication.CreateBuilder(args);


var server = builder.Configuration["server"] ?? "localhost";
var port = builder.Configuration["port"] ?? "1433";
var db = builder.Configuration["database"] ?? "Db";
var password = builder.Configuration["password"] ?? "StrongPassword123!";
var user = builder.Configuration["dbuser"] ?? "sa";
var connectionString = $"Server={server},{port};Database={db};User ID={user};Password={password};TrustServerCertificate=True";
// var connectionString = "Server=DESKTOP-DBEI4M5\\SQLEXPRESS;Database=Db;Trusted_Connection=True;TrustServerCertificate=True";
builder.Services.AddDbContext<ApplicationDbContext>(option => {
    option.UseSqlServer(connectionString);
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
ApplyMigration();

app.Run();

void ApplyMigration()
{
    using (var scope = app.Services.CreateScope())
    {
        var _db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if (!_db.Database.GetService<IRelationalDatabaseCreator>().Exists())
        {
            _db.Database.Migrate();
        }
    }
}
