# 🔗 Trimrr - URL Shortener

A modern, full-featured URL shortener built with React.js, featuring user authentication, analytics, QR code generation, and a beautiful UI.

![React](https://img.shields.io/badge/React-19.2.0-blue.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.18-38B2AC.svg)
![Supabase](https://img.shields.io/badge/Supabase-2.91.0-3ECF8E.svg)

## ✨ Features

- **🔐 User Authentication**: Secure login/signup with Supabase Auth
- **✂️ URL Shortening**: Create short, custom URLs instantly
- **📊 Analytics Dashboard**: Track clicks, locations, and device statistics
- **📱 QR Code Generation**: Automatic QR code creation for each shortened URL
- **🎨 Modern UI**: Beautiful interface built with Shadcn/UI components
- **📈 Click Tracking**: Real-time analytics with location and device data
- **🔍 Search & Filter**: Find your URLs quickly
- **📋 One-Click Copy**: Copy shortened URLs to clipboard
- **📱 Responsive Design**: Works perfectly on all devices
- **⚡ Fast & Lightweight**: Built with Vite for optimal performance

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - Modern React with latest features
- **Vite 7.2.4** - Fast build tool and dev server
- **React Router 7.12.0** - Client-side routing
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible UI components
  - Radix UI primitives for accessibility
  - Class Variance Authority for component variants
  - Tailwind Merge for class management

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - File storage for QR codes
  - Authentication system

### Additional Libraries
- **Lucide React** - Beautiful icons
- **React QR Code Logo** - QR code generation
- **Recharts** - Data visualization for analytics
- **React Spinners** - Loading animations
- **Yup** - Form validation
- **UA Parser JS** - User agent parsing for device detection

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/PrinceDobariya0710/url_shortener.git
   cd url_shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key
   VITE_DOMAIN=your_domain.com
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── CreateLink.jsx  # URL creation form
│   ├── LinkCard.jsx    # URL display card
│   ├── LocationStats.jsx # Location analytics
│   ├── DeviceStats.jsx # Device analytics
│   └── ...
├── pages/              # Route components
│   ├── Dashboard.jsx   # Main dashboard
│   ├── LinkPage.jsx    # Individual link details
│   ├── Auth.jsx        # Authentication page
│   └── ...
├── layouts/            # Layout components
│   └── AppLayout.jsx   # Main app layout
├── db/                 # Supabase API functions
│   ├── apiAuth.js      # Authentication APIs
│   ├── apiUrls.js      # URL management APIs
│   ├── apiClicks.js    # Click tracking APIs
│   └── supabase.js     # Supabase client
├── hooks/              # Custom React hooks
│   └── useFetch.jsx    # Data fetching hook
├── Context.jsx         # Global state management
└── App.jsx            # Main app component
```

## 🗄️ Database Schema

### URLs Table
```sql
CREATE TABLE urls (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  original_url TEXT NOT NULL,
  short_url VARCHAR(10) UNIQUE NOT NULL,
  custom_url VARCHAR(50) UNIQUE,
  user_id UUID REFERENCES auth.users(id),
  qr TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Clicks Table
```sql
CREATE TABLE clicks (
  id SERIAL PRIMARY KEY,
  url_id INTEGER REFERENCES urls(id),
  city VARCHAR(255),
  country VARCHAR(255),
  device VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
The app can be deployed to any static hosting service like Netlify, GitHub Pages, or Render.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Supabase](https://supabase.com/) for the amazing backend platform
- [Shadcn](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the awesome frontend library

## 📞 Contact

Made with ❤️ by Prince Kumar

- GitHub: [PrinceDobariya0710](https://github.com/PrinceDobariya0710)
- LinkedIn: [princekumar-dobariya](https://www.linkedin.com/in/princekumar-dobariya-198637154/)

---

**Star this repo if you found it helpful! ⭐**
