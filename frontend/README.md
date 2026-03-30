# Portfolio Frontend

A modern React application built with Vite for managing and showcasing portfolio projects.

## 🚀 Features

- **Project Management**: Add, edit, and delete portfolio projects
- **Responsive Design**: Mobile-friendly interface with Tailwind-inspired styling
- **Real-time API Integration**: Seamless communication with Spring Boot backend
- **Modern Stack**: React 18 with Vite for fast development
- **Internationalization (i18n)**: Full PT-BR / English language toggle in the navbar. All page content (sections, descriptions, skills, projects, certificates, modals) is dynamically translated. Portuguese (PT-BR) is selected by default

## 📦 Prerequisites

- Node.js 16+ and npm
- Backend server running on `http://localhost:8080`

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   cd frontend
   npm install
   ```

## 🚀 Running the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔨 Building for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── i18n/
│   │   ├── translations.ts    # All PT-BR / ENG translations
│   │   └── LanguageContext.tsx # React Context + useLanguage hook
│   ├── components/            # UI components (all i18n-aware)
│   ├── App.tsx                # Main app component (wraps LanguageProvider)
│   ├── App.css                # App styles
│   ├── config.ts              # API configuration
│   ├── index.css              # Global styles
│   └── main.tsx               # React entry point
├── index.html                 # HTML template
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
└── .eslintrc.json             # ESLint configuration
```

## 🔌 API Endpoints Used

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `PUT /api/projects/{id}` - Update a project
- `DELETE /api/projects/{id}` - Delete a project

## 📝 Environment Variables

Create a `.env` file if needed:
```
VITE_API_URL=http://localhost:8080/api
```

## 🎨 Styling

The application uses custom CSS with a modern purple gradient design. Colors and layout are responsive and mobile-friendly.

## 🤝 Contributing

Feel free to fork and submit pull requests!
