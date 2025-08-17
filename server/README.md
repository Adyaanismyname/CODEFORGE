# CodeForge Server

Backend API server for CodeForge contact form with email functionality.

## Features

- Contact form API endpoint
- Dual email delivery (admin notification + user confirmation)
- Professional HTML email templates
- CORS configuration for frontend integration
- Gmail SMTP integration with app passwords
- Health check endpoint
- Ready for Vercel deployment

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the `.env` file and update with your credentials:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@yourdomain.com

# Server Configuration
PORT=3001
NODE_ENV=development

# Frontend URLs for CORS
FRONTEND_URL=http://localhost:5173
PRODUCTION_FRONTEND_URL=https://yourdomain.vercel.app
```

### 3. Gmail Setup
1. Enable 2-factor authentication on Gmail
2. Generate an app password (not your regular password)
3. Use the app password in `EMAIL_PASS`

### 4. Run Development Server
```bash
npm run dev
```

Server will run on `http://localhost:3001`

## API Endpoints

### POST `/api/contact`
Submit contact form data and send emails.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "project": "I need a website for my business..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Emails sent successfully! We'll be in touch soon."
}
```

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-18T12:00:00.000Z",
  "environment": "development"
}
```

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from server directory:**
   ```bash
   cd server
   vercel
   ```

4. **Set Environment Variables in Vercel Dashboard:**
   - `EMAIL_USER`
   - `EMAIL_PASS` 
   - `ADMIN_EMAIL`
   - `NODE_ENV=production`
   - `PRODUCTION_FRONTEND_URL=https://your-frontend-domain.vercel.app`

5. **Update Frontend API Config:**
   Update your frontend's API configuration to point to the deployed server URL.

### Alternative: Deploy with Frontend

You can also deploy both frontend and backend together using the main `vercel.json` in the project root.

## Project Structure

```
server/
├── index.js           # Main server file
├── package.json       # Server dependencies
├── vercel.json        # Vercel deployment config
├── .env              # Environment variables
└── README.md         # This file
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EMAIL_USER` | Gmail address for sending emails | `contact@yourcompany.com` |
| `EMAIL_PASS` | Gmail app password | `abcd efgh ijkl mnop` |
| `ADMIN_EMAIL` | Email to receive contact notifications | `admin@yourcompany.com` |
| `PORT` | Server port (auto-assigned in production) | `3001` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `FRONTEND_URL` | Frontend URL for CORS (development) | `http://localhost:5173` |
| `PRODUCTION_FRONTEND_URL` | Frontend URL for CORS (production) | `https://yoursite.vercel.app` |

## Email Templates

The server includes professional HTML email templates:

- **Admin Notification**: Detailed contact form submission with reply-to functionality
- **User Confirmation**: Branded thank you email with next steps and contact information

## Security Features

- Input validation and sanitization
- Email format validation
- CORS protection
- Rate limiting ready (can be added)
- Secure email transmission with TLS

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure frontend URL is correctly set in environment variables
2. **Email Sending Fails**: Verify Gmail app password and 2FA is enabled
3. **Port Conflicts**: macOS uses port 5000 for AirPlay, use 3001 instead

### Testing

Test the health endpoint:
```bash
curl http://localhost:3001/api/health
```

Test contact submission:
```bash
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","project":"Test message"}'
```

## Support

For issues or questions, contact the development team or check the main project documentation.
