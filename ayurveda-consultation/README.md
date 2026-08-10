# ARAYAL Ayurveda Consultation System

Single-folder full-stack application based on the supplied freelance proposal.

## Stack

- Next.js App Router
- JavaScript
- shadcn-style UI components
- Tailwind CSS
- Next.js Pages API backend
- PostgreSQL
- Prisma ORM
- JWT authentication in HttpOnly cookie
- bcrypt password hashing
- formidable file upload
- PDFKit prescription generation
- Docker + Docker Compose

## Features

### Patient

- Registration/login
- Patient dashboard
- Book appointment
- View appointments
- Upload PDF/JPG/PNG medical reports
- View reports
- Access Zoom link
- View/download prescription PDF
- Update profile

### Doctor/Admin

- Admin login
- Dashboard analytics
- Patient list
- Patient details
- Medical reports
- Appointment list
- Add Zoom link
- Generate prescription PDF

## Local setup

1. Install Node.js 20+ and PostgreSQL, or use Docker.
2. Copy `.env.example` to `.env`.
3. Install packages:

```bash
npm install
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Create/apply migration:

```bash
npx prisma migrate dev --name init
```

6. Seed:

```bash
npm run prisma:seed
```

7. Start:

```bash
npm run dev
```

Open http://localhost:3000

## Docker

Run:

```bash
docker compose up --build
```

The application is available at:

http://localhost:3000

## Demo accounts

Admin:

- Email: admin@arayal.com
- Password: ********

Patient:

- Email: patient@arayal.com
- Password: ********

Change these credentials and JWT_SECRET before production use.

## Important production work

Before production deployment, add:

- HTTPS
- strong JWT secret
- secure secret management
- cloud object storage for medical files
- virus/file scanning
- stricter file authorization
- rate limiting
- audit logging
- email/SMS notifications
- real Zoom API integration if automatic meeting creation is required
- database backups
- production reverse proxy
