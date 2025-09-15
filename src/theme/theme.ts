import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#636cf1', // Deep professional blue
      light: '#2E5984',
      dark: '#0F2642',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C8A96F', // Premium gold accent
      light: '#D4B988',
      dark: '#B8954F',
      contrastText: '#000000',
    },
    background: {
      default: '#F8FAFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1E293B',
      secondary: '#64748B',
    },
    error: {
      main: '#DC2626',
    },
    warning: {
      main: '#D97706',
    },
    success: {
      main: '#059669',
    },
    info: {
      main: '#0284C7',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '21px',   // was 2.5rem (~40px)
      fontWeight: 700,
      lineHeight: 1.3,
      color: '#1E293B',
    },
    h2: {
      fontSize: '20px',   // was 2rem (~32px)
      fontWeight: 600,
      lineHeight: 1.3,
      color: '#1E293B',
    },
    h3: {
      fontSize: '19px',   // was 1.5rem (~24px)
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1E293B',
    },
    h4: {
      fontSize: '18px',   // was 1.25rem (~20px)
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1E293B',
    },
    h5: {
      fontSize: '16px',   // was 1.125rem (~18px)
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1E293B',
    },
    h6: {
      fontSize: '14px',   // was 1rem (~16px)
      fontWeight: 600,
      lineHeight: 1.4,
      color: '#1E293B',
    },
  
    // Body text
    body1: {
      fontSize: '14px',   // kept inside range
      lineHeight: 1.6,
      color: '#475569',
    },
    body2: {
      fontSize: '12px',   // min threshold
      lineHeight: 1.6,
      color: '#64748B',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.08)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.12)',
    '0px 16px 32px rgba(0, 0, 0, 0.15)',
    '0px 20px 40px rgba(0, 0, 0, 0.18)',
    '0px 24px 48px rgba(0, 0, 0, 0.2)',
    '0px 32px 64px rgba(0, 0, 0, 0.24)',
    '0px 40px 80px rgba(0, 0, 0, 0.28)',
    '0px 48px 96px rgba(0, 0, 0, 0.32)',
    '0px 56px 112px rgba(0, 0, 0, 0.36)',
    '0px 64px 128px rgba(0, 0, 0, 0.4)',
    '0px 72px 144px rgba(0, 0, 0, 0.44)',
    '0px 80px 160px rgba(0, 0, 0, 0.48)',
    '0px 88px 176px rgba(0, 0, 0, 0.52)',
    '0px 96px 192px rgba(0, 0, 0, 0.56)',
    '0px 104px 208px rgba(0, 0, 0, 0.6)',
    '0px 112px 224px rgba(0, 0, 0, 0.64)',
    '0px 120px 240px rgba(0, 0, 0, 0.68)',
    '0px 128px 256px rgba(0, 0, 0, 0.72)',
    '0px 136px 272px rgba(0, 0, 0, 0.76)',
    '0px 144px 288px rgba(0, 0, 0, 0.8)',
    '0px 152px 304px rgba(0, 0, 0, 0.84)',
    '0px 160px 320px rgba(0, 0, 0, 0.88)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: '8px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
        contained: {
          background: "linear-gradient(135deg, #636cf1 0%, #4a54e1 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #5a63e0 0%, #4c55c9 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid #E2E8F0',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '8px',
            backgroundColor: '#FFFFFF',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#C8A96F',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1B365D',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});