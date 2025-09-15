import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';

const steps = ['Personal Information', 'Accident Details', 'Document Uploads'];

const SubmitClaimPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    country: '',
  });

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => setActiveStep(prev => prev + 1);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Your Details
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom mb={3}>
              Please provide your personal information to start your claim.
            </Typography>

            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={2}>
              <TextField
                size="small"
                fullWidth
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="John Doe"
              />
              <TextField
                size="small"
                fullWidth
                label="Email Address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john.doe@example.com"
              />
              <TextField
                size="small"
                fullWidth
                label="Phone Number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </Box>

            <Box mt={2} display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
              <TextField
                size="small"
                fullWidth
                label="Street Address"
                value={formData.street}
                onChange={(e) => handleInputChange('street', e.target.value)}
                placeholder="123 Main St"
              />
              <TextField
                size="small"
                fullWidth
                label="City"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="New York"
              />
              <TextField
                select
                size="small"
                fullWidth
                label="Country"
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="Canada">Canada</MenuItem>
                <MenuItem value="India">India</MenuItem>
              </TextField>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      {/* Page Title */}
      <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
        New Claim Submission
      </Typography>

      <Card sx={{ borderRadius: 3, boxShadow: 3, p: { xs: 2, md: 4 } }}>
        <CardContent>
          {/* Stepper */}
          <Stepper activeStep={activeStep} alternativeLabel={!isMobile} sx={{ mb: 4 }}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  sx={{
                    '& .MuiStepLabel-label': { fontSize: '0.9rem', fontWeight: 500 },
                    '& .MuiStepIcon-root': { color: '#d0d0d0' },
                    '& .MuiStepIcon-root.Mui-active': { color: theme.palette.primary.main },
                    '& .MuiStepIcon-root.Mui-completed': { color: theme.palette.success.main },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Step Content */}
          {renderStepContent()}

          {/* Action Buttons */}
          <Box display="flex" justifyContent="flex-end" mt={4}>
            <Button
              variant="contained"
              onClick={handleNext}
              size="medium"
              sx={{
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
              }}
            >
              Next Step
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitClaimPage;
