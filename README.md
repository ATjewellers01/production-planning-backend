# Production Planning Backend

Node.js, Express, TypeScript, PostgreSQL, and Drizzle ORM backend for the production planning ERP.

## Tech Stack

- Node.js 20+
- Express 4
- TypeScript
- PostgreSQL
- Drizzle ORM and Drizzle Kit
- Zod validation

## Folder Structure

```txt
backend/
  src/
    app.ts                  # Express app composition
    server.ts               # HTTP server bootstrap and shutdown
    config/                 # Environment and app configuration
    db/
      client.ts             # PostgreSQL pool and Drizzle client
      schema/               # Drizzle tables, enums, relations, shared columns
    middleware/             # Express middleware
    models/
      users/                # User module
      products/             # Product/master item module
      production-orders/    # Production order module
    routes/
      index.ts              # API route registry
    utils/                  # Shared backend helpers
  drizzle.config.ts         # Drizzle Kit config
  .env.example              # Required environment variables
```

Each model folder follows the same senior-backend pattern:

```txt
model.validation.ts    # Request validation and inferred input types
model.repository.ts    # Database access only
model.service.ts       # Business rules and orchestration
model.controller.ts    # HTTP request/response handling
model.routes.ts        # Express route definitions
```

This keeps controllers thin, services testable, and database code isolated.

## Setup

```bash
cd backend
cp .env.example .env
npm install
```

Update `.env` with your PostgreSQL connection. You can use one URL:

```env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/production_planning
```

Or split AWS RDS fields:

```env
DB_HOST=your-rds-endpoint.ap-south-1.rds.amazonaws.com
DB_USER=postgres
DB_PASSWORD=your-password
DB_NAME=postgres
DB_PORT=5432
DB_SSL=require
```

## Database

Generate migrations from Drizzle schema:

```bash
npm run db:generate
```

Apply migrations:

```bash
npm run db:migrate
```

Open Drizzle Studio:

```bash
npm run db:studio
```

## Development

```bash
npm run dev
```

Default server:

```txt
http://localhost:4000
```

Health check:

```txt
GET /health
```

API prefix:

```txt
/api/v1
```

## Current API Modules

### Users

```txt
GET    /api/v1/users
GET    /api/v1/users/:id
POST   /api/v1/users
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id
```

### Products

```txt
GET    /api/v1/products
GET    /api/v1/products/:id
POST   /api/v1/products
PATCH  /api/v1/products/:id
DELETE /api/v1/products/:id
```

### Production Orders

```txt
GET    /api/v1/production-orders
GET    /api/v1/production-orders/:id
POST   /api/v1/production-orders
PATCH  /api/v1/production-orders/:id
DELETE /api/v1/production-orders/:id
```

## Adding A New Model

1. Create a new folder under `src/models/<model-name>`.
2. Add validation, repository, service, controller, and routes files.
3. Add the Drizzle table in `src/db/schema/<model-name>.ts`.
4. Export the table from `src/db/schema/index.ts`.
5. Register routes in `src/routes/index.ts`.
6. Run `npm run db:generate` and `npm run db:migrate`.

## Rules For This Backend

- Controllers should not contain business logic.
- Services should not directly format HTTP responses.
- Repositories should not contain request validation or business decisions.
- All request bodies and route params should be validated with Zod.
- Drizzle schema is the source of truth for database shape.
- Use migrations for every database change.
