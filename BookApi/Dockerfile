# Use the official .NET image as a base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS base
WORKDIR /app
EXPOSE 8080

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src
COPY ["BookApi.csproj", "./"]
RUN dotnet restore "BookApi.csproj"
COPY . .
RUN dotnet build "BookApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BookApi.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BookApi.dll"]
