# AI-Powered Form Generator

A full-stack web application that uses AI to generate dynamic forms. Users can describe forms in plain English, and the AI creates complete form schemas with validation, multiple field types, and image upload support.

## Features

- **AI Form Generation**: Describe forms in natural language and let AI create them
- **Authentication**: Secure email/password authentication with Supabase
- **Dynamic Forms**: Support for 9+ field types (text, email, number, textarea, select, radio, checkbox, file, date)
- **Image Uploads**: Cloudinary integration for file uploads
- **Form Sharing**: Public URLs for form submissions
- **Real-time Dashboard**: Track submissions and manage forms
- **Validation**: Built-in field validation with custom rules
- **Responsive Design**: Beautiful, mobile-friendly UI with Tailwind CSS

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and builds
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Supabase** for database and authentication
- **Supabase Edge Functions** for serverless API
- **PostgreSQL** with Row Level Security
- **Google Gemini AI** for form generation

### Storage
- **Cloudinary** for image uploads (optional)
- Base64 fallback when Cloudinary not configured

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── FileUpload.tsx       # Image upload component
│   │   ├── FormCard.tsx         # Dashboard form card
│   │   ├── FormRenderer.tsx     # Dynamic form renderer
│   │   └── ProtectedRoute.tsx   # Auth route guard
│   ├── contexts/
│   │   └── AuthContext.tsx      # Authentication state
│   ├── lib/
│   │   ├── auth.ts              # Auth utilities
│   │   └── supabase.ts          # Supabase client & types
│   ├── pages/
│   │   ├── Dashboard.tsx        # User dashboard
│   │   ├── FormSubmit.tsx       # Public form submission
│   │   ├── Generator.tsx        # AI form generator
│   │   ├── Home.tsx             # Landing page
│   │   ├── Login.tsx            # Login page
│   │   └── SignUp.tsx           # Registration page
│   ├── App.tsx                  # Main app component
│   └── main.tsx                 # App entry point
├── supabase/
│   └── functions/
│       └── generate-form/       # AI form generation function
└── .env                         # Environment variables
```

## Database Schema

### Tables

**forms**
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users)
- `title` (text)
- `description` (text)
- `schema` (jsonb) - Form field definitions
- `is_public` (boolean)
- `created_at`, `updated_at` (timestamptz)

**submissions**
- `id` (uuid, primary key)
- `form_id` (uuid, references forms)
- `user_id` (uuid, nullable)
- `data` (jsonb) - Submission data
- `created_at` (timestamptz)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ai-form-generator
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
# Required
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
```

### 3. Supabase Setup

The database is already configured with:
- Forms and submissions tables
- Row Level Security policies
- Indexes for performance
- Auto-update triggers

### 4. Edge Function Setup

The `generate-form` Edge Function is deployed and ready to use. It uses Google Gemini AI to generate form schemas from natural language prompts.

### 5. Get Google Gemini API Key (Optional)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a free API key
3. Users can provide their own API key when generating forms

### 6. Cloudinary Setup (Optional)

For permanent image storage:

1. Create a free account at [Cloudinary](https://cloudinary.com)
2. Get your Cloud Name from the dashboard
3. Create an unsigned upload preset:
   - Go to Settings > Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set "Signing Mode" to "Unsigned"
   - Save the preset name
4. Add to `.env`:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=your_preset_name
   ```

**Note**: If Cloudinary is not configured, images will be stored as base64 data URLs.

## Running the Application

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Usage Guide

### Creating Forms

1. **Sign Up/Login**: Create an account or sign in
2. **Navigate to Generator**: Click "Create New Form"
3. **Describe Your Form**: Enter a natural language description
   - Example: "I need a signup form with name, email, age, and profile picture"
4. **Generate**: Click "Generate Form" to let AI create it
5. **Customize**: Edit title and description
6. **Save**: Save the form to your dashboard

### Sharing Forms

1. Go to your Dashboard
2. Click "Copy Link" on any form card
3. Share the link with respondents
4. View submissions in your dashboard

### Form Field Types

- **Text**: Single-line text input
- **Email**: Email validation
- **Number**: Numeric input with min/max
- **Textarea**: Multi-line text
- **Select**: Dropdown selection
- **Radio**: Single choice from options
- **Checkbox**: Multiple choices
- **File**: Image upload
- **Date**: Date picker

## API Endpoints (Edge Functions)

### POST /functions/v1/generate-form

Generates a form schema from natural language.

**Request Body:**
```json
{
  "prompt": "I need a contact form with name, email, and message",
  "geminiApiKey": "optional_api_key"
}
```

**Response:**
```json
{
  "schema": {
    "fields": [
      {
        "id": "name",
        "label": "Name",
        "type": "text",
        "required": true,
        "placeholder": "Enter your name"
      }
    ]
  }
}
```

## Security Features

- Row Level Security on all tables
- JWT-based authentication
- Secure API endpoints
- Protected routes
- Input validation
- XSS protection

## Performance Optimizations

- Database indexes on foreign keys
- Lazy loading of components
- Optimized bundle size
- Image optimization via Cloudinary
- Efficient query patterns

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### AI Generation Fails
- Verify Gemini API key is valid
- Check Edge Function logs in Supabase dashboard
- Ensure prompt is clear and descriptive

### Image Upload Issues
- Verify Cloudinary credentials
- Check file size (max 10MB)
- Ensure file is an image format

### Authentication Issues
- Clear browser cache and cookies
- Check Supabase configuration
- Verify email/password requirements

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or questions, please open an issue on GitHub.
