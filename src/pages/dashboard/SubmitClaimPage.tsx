import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { CloudUpload, CheckCircle, ArrowBack, Send } from '@mui/icons-material';
import FileUploadComponent from '../../components/common/FileUploadComponent';

interface FormData {
  policyNumber: string;
  accidentDate: string;
  accidentLocation: string;
  description: string;
  documents: {
    insurance: File | null;
    license: File | null;
    registration: File | null;
    photos: File[];
    mv104: File | null;
    nf2: File | null;
  };
}

const steps = ['Basic Information', 'Upload Documents', 'Review & Submit'];

const SubmitClaimPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    policyNumber: '',
    accidentDate: '',
    accidentLocation: '',
    description: '',
    documents: {
      insurance: null,
      license: null,
      registration: null,
      photos: [],
      mv104: null,
      nf2: null,
    },
  });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return formData.policyNumber && formData.accidentDate && formData.accidentLocation && formData.description;
      case 1:
        return formData.documents.insurance && formData.documents.license && formData.documents.registration;
      default:
        return true;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field: string, file: File | File[]) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [field]: file
      }
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      navigate('/', { 
        state: { message: 'Claim submitted successfully! You will receive a confirmation email shortly.' }
      });
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={3}>
            <TextField
              fullWidth
              label="Policy Number"
              value={formData.policyNumber}
              onChange={(e) => handleInputChange('policyNumber', e.target.value)}
              required
              placeholder="POL-123456789"
            />
            <TextField
              fullWidth
              label="Accident Date"
              type="date"
              value={formData.accidentDate}
              onChange={(e) => handleInputChange('accidentDate', e.target.value)}
              required
              InputLabelProps={{ shrink: true }}
            />
            <Box gridColumn={{ xs: '1', md: '1 / -1' }}>
              <TextField
                fullWidth
                label="Accident Location"
                value={formData.accidentLocation}
                onChange={(e) => handleInputChange('accidentLocation', e.target.value)}
                required
                placeholder="Street address, city, state"
              />
            </Box>
            <Box gridColumn={{ xs: '1', md: '1 / -1' }}>
              <TextField
                fullWidth
                label="Description of Accident"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
                multiline
                rows={4}
                placeholder="Please provide a detailed description of how the accident occurred..."
              />
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Required Documents
            </Typography>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: 'repeat(3, 1fr)' }} gap={3} mb={4}>
              <FileUploadComponent
                label="Insurance Document"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onFileSelect={(file) => handleFileUpload('insurance', file)}
                file={formData.documents.insurance}
              />
              <FileUploadComponent
                label="Driving License"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onFileSelect={(file) => handleFileUpload('license', file)}
                file={formData.documents.license}
              />
              <FileUploadComponent
                label="Car Registration"
                accept=".pdf,.jpg,.jpeg,.png"
                required
                onFileSelect={(file) => handleFileUpload('registration', file)}
                file={formData.documents.registration}
              />
            </Box>
            
            <Divider sx={{ my: 3 }} />
            <Typography variant="h6" gutterBottom color="primary">
              Additional Documents
            </Typography>
            
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '2fr 1fr 1fr' }} gap={3}>
              <FileUploadComponent
                label="Accident Photographs"
                accept=".jpg,.jpeg,.png"
                multiple
                onFileSelect={(files) => handleFileUpload('photos', files as File[])}
                files={formData.documents.photos}
              />
              <FileUploadComponent
                label="MV-104 Form"
                accept=".pdf"
                onFileSelect={(file) => handleFileUpload('mv104', file)}
                file={formData.documents.mv104}
              />
              <FileUploadComponent
                label="NF-2 Form"
                accept=".pdf"
                onFileSelect={(file) => handleFileUpload('nf2', file)}
                file={formData.documents.nf2}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary">
              Review Your Claim Details
            </Typography>
            
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Basic Information
                </Typography>
                <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} gap={2}>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Policy Number</Typography>
                    <Typography variant="body1">{formData.policyNumber}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="body2" color="text.secondary">Accident Date</Typography>
                    <Typography variant="body1">{new Date(formData.accidentDate).toLocaleDateString()}</Typography>
                  </Box>
                  <Box gridColumn={{ xs: '1', sm: '1 / -1' }}>
                    <Typography variant="body2" color="text.secondary">Accident Location</Typography>
                    <Typography variant="body1">{formData.accidentLocation}</Typography>
                  </Box>
                  <Box gridColumn={{ xs: '1', sm: '1 / -1' }}>
                    <Typography variant="body2" color="text.secondary">Description</Typography>
                    <Typography variant="body1">{formData.description}</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Uploaded Documents
                </Typography>
                <List dense>
                  {formData.documents.insurance && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText primary="Insurance Document" secondary={formData.documents.insurance.name} />
                      <Chip label="Required" size="small" color="primary" />
                    </ListItem>
                  )}
                  {formData.documents.license && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText primary="Driving License" secondary={formData.documents.license.name} />
                      <Chip label="Required" size="small" color="primary" />
                    </ListItem>
                  )}
                  {formData.documents.registration && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText primary="Car Registration" secondary={formData.documents.registration.name} />
                      <Chip label="Required" size="small" color="primary" />
                    </ListItem>
                  )}
                  {formData.documents.photos.length > 0 && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText 
                        primary="Accident Photographs" 
                        secondary={`${formData.documents.photos.length} file(s)`} 
                      />
                      <Chip label="Optional" size="small" color="secondary" />
                    </ListItem>
                  )}
                  {formData.documents.mv104 && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText primary="MV-104 Form" secondary={formData.documents.mv104.name} />
                      <Chip label="Optional" size="small" color="secondary" />
                    </ListItem>
                  )}
                  {formData.documents.nf2 && (
                    <ListItem>
                      <CheckCircle color="success" sx={{ mr: 1 }} />
                      <ListItemText primary="NF-2 Form" secondary={formData.documents.nf2.name} />
                      <Chip label="Optional" size="small" color="secondary" />
                    </ListItem>
                  )}
                </List>
              </CardContent>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={4}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Back to Dashboard
        </Button>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Submit New Claim
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Complete the form below to submit your insurance claim
          </Typography>
        </Box>
      </Box>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }} orientation={isMobile ? 'vertical' : 'horizontal'}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent()}

          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                size="large"
              >
                {loading ? 'Submitting...' : 'Submit Claim'}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!validateStep()}
                size="large"
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SubmitClaimPage;