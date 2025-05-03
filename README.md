# One Stack

A modern learning platform built with React and Tailwind CSS. The platform provides an intuitive interface for users to explore educational content, track their learning progress, and engage with various learning domains.

## Features

- 📊 Interactive Dashboard with learning progress tracking
- 📚 Domain-based learning paths
- 📝 Article library with search and filtering
- 🎨 Modern UI with Tailwind CSS
- 📱 Responsive design for all devices
- 🔐 User authentication

## Tech Stack

- React 18
- React Router v6
- Tailwind CSS
- Vite
- Node.js >= 14.x

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The application will start running at `http://localhost:3000`

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── layout/      # Layout components
│   │   ├── navigation/  # Navigation components
│   │   └── ui/          # Reusable UI components
│   ├── pages/           # Page components
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
