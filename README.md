# ClaimWise Frontend

A modern frontend application for managing insurance claims, built with React and TypeScript.

## Technologies Used

- **Vite** - Fast build tooling
- **TypeScript** - Type-safe JavaScript
- **React** - UI framework
- **shadcn-ui** - Accessible component system
- **Tailwind CSS** - Utility-first CSS framework

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm or your preferred package manager

### Local Development

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd ClaimWise_Applicant_FE
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
ClaimWise_Applicant_FE/
├── public/                 # Static assets
├── src/                    # Source code
│   ├── components/         # Reusable components
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Shared components
│   │   └── layout/        # Layout components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Application pages
│   │   ├── auth/          # Authentication pages
│   │   └── dashboard/     # Dashboard pages
│   ├── theme/             # Theme configuration
│   ├── App.tsx            # Root component
│   └── main.tsx          # Application entry point
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

## Key Features

- Authentication system with protected routes
- Dashboard for claims management
- File upload functionality
- Mobile-responsive design
- FAQ section
- Claims submission and tracking

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and confidential. All rights reserved.
