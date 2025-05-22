1. 📦 Prerequisites
Node.js ≥ 18
PostgreSQL (locally or via Docker)
2. 🐳 PostgreSQL via Docker
docker run --name access-pg -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=accessdb -p 5432:5432 -d postgres
3. 🔨 Install & Run Backend
cd backend
npm install
npm run dev
4. ⚙️ Environment Variables (.env)
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=admin
DB_PASSWORD=admin
DB_NAME=accessdb
JWT_SECRET=yashwanth
