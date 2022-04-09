using Domain;
using PIB.Api.Setup;
using PIB.Infrastructure.BlobStorage;
using PIB.Infrastructure.MediatR;
using PIB.Infrastructure.Mongo;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Host.ConfigureLogging();

builder.Services.ConfigureAuth();
builder.Services.ConfigureAPI(builder.Configuration);

builder.Services.AddAndConfigureMongoDB(builder.Configuration);
builder.Services.AddAndConfigureMediatR(builder.Configuration);
builder.Services.AddAndConfigureBlobStorage(builder.Configuration);

builder.Services.AddAndConfigureDomain(builder.Configuration);

var app = builder.Build();

app.UseApi();
