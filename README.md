# File Uploader

A file management web app where users can register, log in, and manage their files and folders.

## Features

- User authentication with Passport.js and bcrypt
- File uploads stored on Cloudinary
- Nested folder support
- Protected routes with session-based auth

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** Passport.js, express-session
- **Storage:** Cloudinary + Multer
- **Templating:** EJS

## Setup

1. Clone the repo and run `npm install`
2. Add your environment variables to `.env`
3. Run `npx prisma migrate dev` to set up the database
4. Start the server with `node app.js`
