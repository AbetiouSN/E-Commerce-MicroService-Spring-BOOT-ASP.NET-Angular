using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductManagemntService.DBContext;
using Steeltoe.Discovery.Client;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Configure DbContext for MySQL
builder.Services.AddDbContext<ProductDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("MySQLConnection"),
        new MySqlServerVersion(new Version(8, 0, 25))));

// Configure logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddDiscoveryClient(builder.Configuration);

// Configure JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidIssuer = "http://localhost:8090",
        ValidAudience = "product-service",
        IssuerSigningKey = new SymmetricSecurityKey(Convert.FromBase64String("68O6oElgaN6n5ng33muN4HPs2Hmw/TuM29X/VGlukHhEwzdqmHF3YnKqN6aNX0eXtCoqW3yGoRJMiY7w3YK3klYk/d2hQDREQobAx88/jOrloWNLfAv2yAlSUjyxkAhKGti1bs/w0k8izCBiEaXUW08qODNBrdYls2VOCi0k6AJlMAc/vKQNQZi5cAFtL9ael3yahKD3r1SlecBFR2a1Vpx9DHSO2Xc1HU/2p2JjepBqBorZBSRJuyYVQXvbuNgRMY8Hm0YFrgr8WzQ/bm7rwsgo9/7AocZC/vjeF+LmvnVsee90wugz9EfCKHHyI8Tv/McBztSWISHiG+NnHnfyJSMvx4yHI6ObhtQwxytYT1Q=")),
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
    };

    // Set the events for additional logging or custom behavior
    options.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication failed: {context.Exception.Message}");
            return Task.CompletedTask;
        },
        OnTokenValidated = context =>
        {
            var claimsIdentity = context.Principal.Identity as ClaimsIdentity;

            if (claimsIdentity != null)
            {
                // Extract roles from the claims
                var roles = claimsIdentity.FindAll(ClaimTypes.Role)
                                           .Select(r => r.Value)
                                           .ToList();
                // Log the roles to the console
                Console.WriteLine("Roles: " + string.Join(", ", roles));
            }
            else
            {
                Console.WriteLine("ClaimsIdentity is null.");
            }

            return Task.CompletedTask;
        },
        OnChallenge = context =>
        {
            Console.WriteLine("Authentication challenge triggered.");
            return Task.CompletedTask;
        },
        OnMessageReceived = context =>
        {
            // Optionally, log the token being received
            Console.WriteLine("Token received: " + context.Request.Headers["Authorization"]);
            return Task.CompletedTask;
        }
    };
});


var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable CORS
app.UseCors("AllowAllOrigins");

// Enable authentication and authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
