<div align="center">
  <h1 align="center">Contapp</h1>
</div>

## Development

### Requirements

- [Node](https://nodejs.org/en/download/)
- [Docker](https://www.docker.com)

### Getting Started

```bash
git clone https://github.com/Michael-Liendo/contapp.git

# step into repository directory
cd ./contapp

# Install dependencies
npm install

# Build the shared package
npm run shared:build
```

#### Run Server

```bash
# Go to server
cd ./server

# Copy .env file
cp .env.example .env

# Run a PostgreSQL with Docker Compose
docker compose up

# Run the database migrations
npm run migrations:up

# Run the server
npm run dev
```

#### Run Client

```bash
# Go to server
cd ./client

# Copy .env file
cp .env.example .env

# Run the server
npm run client:dev
```

## License

Licensed under the MIT License
