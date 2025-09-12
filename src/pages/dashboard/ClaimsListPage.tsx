import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Add, Visibility, Description } from '@mui/icons-material';

interface Claim {
  id: string;
  policyNumber: string;
  dateSubmitted: string;
  status: 'Approved' | 'Rejected' | 'In Progress' | 'Pending Review';
  lastUpdated: string;
  accidentDate: string;
  estimatedAmount: string;
}

const mockClaims: Claim[] = [
  {
    id: 'CLM-2024-001',
    policyNumber: 'POL-123456789',
    dateSubmitted: '2024-01-15',
    status: 'Approved',
    lastUpdated: '2024-01-20',
    accidentDate: '2024-01-10',
    estimatedAmount: '$2,500',
  },
  {
    id: 'CLM-2024-002',
    policyNumber: 'POL-123456789',
    dateSubmitted: '2024-02-03',
    status: 'In Progress',
    lastUpdated: '2024-02-05',
    accidentDate: '2024-02-01',
    estimatedAmount: '$4,200',
  },
  {
    id: 'CLM-2024-003',
    policyNumber: 'POL-123456789',
    dateSubmitted: '2024-02-20',
    status: 'Pending Review',
    lastUpdated: '2024-02-20',
    accidentDate: '2024-02-18',
    estimatedAmount: '$1,800',
  },
];

const ClaimsListPage = () => {
  const [claims] = useState<Claim[]>(mockClaims);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Rejected':
        return 'error';
      case 'In Progress':
        return 'warning';
      case 'Pending Review':
        return 'info';
      default:
        return 'default';
    }
  };

  const ClaimCard = ({ claim }: { claim: Claim }) => (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="h6" color="primary">
            {claim.id}
          </Typography>
          <Chip
            label={claim.status}
            color={getStatusColor(claim.status) as any}
            size="small"
          />
        </Box>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Policy: {claim.policyNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Accident Date: {new Date(claim.accidentDate).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Submitted: {new Date(claim.dateSubmitted).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Estimated: {claim.estimatedAmount}
        </Typography>
        <Box mt={2}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Visibility />}
            onClick={() => navigate('/status')}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Claims Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage and track your insurance claims
          </Typography>
        </Box>
        {!isMobile && (
          <Button
            variant="contained"
            size="large"
            startIcon={<Add />}
            onClick={() => navigate('/submit-claim')}
            sx={{ minWidth: 200 }}
          >
            Submit New Claim
          </Button>
        )}
      </Box>

      <Box display="grid" gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }} gap={3} mb={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {claims.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Claims
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="success.main" fontWeight="bold">
              {claims.filter(c => c.status === 'Approved').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Approved
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="warning.main" fontWeight="bold">
              {claims.filter(c => c.status === 'In Progress').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              In Progress
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h4" color="info.main" fontWeight="bold">
              {claims.filter(c => c.status === 'Pending Review').length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pending Review
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {isMobile ? (
        <Box>
          {claims.map((claim) => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </Box>
      ) : (
        <Card>
          <CardContent>
            <Box display="flex" alignItems="center" mb={3}>
              <Description sx={{ mr: 1, color: 'primary.main' }} />
              <Typography variant="h6">Recent Claims</Typography>
            </Box>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Claim ID</strong></TableCell>
                    <TableCell><strong>Policy Number</strong></TableCell>
                    <TableCell><strong>Date Submitted</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Estimated Amount</strong></TableCell>
                    <TableCell><strong>Actions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {claims.map((claim) => (
                    <TableRow key={claim.id} hover>
                      <TableCell>
                        <Typography variant="body2" color="primary" fontWeight="600">
                          {claim.id}
                        </Typography>
                      </TableCell>
                      <TableCell>{claim.policyNumber}</TableCell>
                      <TableCell>{new Date(claim.dateSubmitted).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Chip
                          label={claim.status}
                          color={getStatusColor(claim.status) as any}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{claim.estimatedAmount}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<Visibility />}
                          onClick={() => navigate('/status')}
                        >
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}

      {isMobile && (
        <Fab
          color="primary"
          aria-label="add claim"
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
          }}
          onClick={() => navigate('/submit-claim')}
        >
          <Add />
        </Fab>
      )}
    </Box>
  );
};

export default ClaimsListPage;