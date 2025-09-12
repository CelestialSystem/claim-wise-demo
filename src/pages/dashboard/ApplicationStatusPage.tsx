import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  CheckCircle,
  HourglassEmpty,
  Assignment,
  Phone,
  Email,
  CalendarToday,
  AttachMoney,
} from '@mui/icons-material';

interface ClaimStatus {
  id: string;
  status: 'Approved' | 'Rejected' | 'In Progress' | 'Pending Review';
  submittedDate: string;
  lastUpdated: string;
  estimatedAmount: string;
  adjusterName: string;
  adjusterPhone: string;
  adjusterEmail: string;
  timeline: Array<{
    date: string;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'pending';
  }>;
}

const mockClaimStatus: ClaimStatus = {
  id: 'CLM-2024-002',
  status: 'In Progress',
  submittedDate: '2024-02-03',
  lastUpdated: '2024-02-05',
  estimatedAmount: '$4,200',
  adjusterName: 'Sarah Johnson',
  adjusterPhone: '+1 (555) 987-6543',
  adjusterEmail: 'sarah.johnson@insurance.com',
  timeline: [
    {
      date: '2024-02-03',
      title: 'Claim Submitted',
      description: 'Your claim has been successfully submitted and assigned a reference number.',
      status: 'completed',
    },
    {
      date: '2024-02-04',
      title: 'Initial Review',
      description: 'Our team has started the initial review of your claim documents.',
      status: 'completed',
    },
    {
      date: '2024-02-05',
      title: 'Adjuster Assigned',
      description: 'A claims adjuster has been assigned to your case for detailed evaluation.',
      status: 'current',
    },
    {
      date: 'Pending',
      title: 'Vehicle Inspection',
      description: 'Physical inspection of the vehicle will be scheduled.',
      status: 'pending',
    },
    {
      date: 'Pending',
      title: 'Settlement Review',
      description: 'Final settlement amount will be determined.',
      status: 'pending',
    },
    {
      date: 'Pending',
      title: 'Payment Processing',
      description: 'Approved amount will be processed for payment.',
      status: 'pending',
    },
  ],
};

const ApplicationStatusPage = () => {
  const [claimData] = useState<ClaimStatus>(mockClaimStatus);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

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

  const getTimelineIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle color="success" />;
      case 'current':
        return <HourglassEmpty color="warning" />;
      default:
        return <Assignment color="disabled" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Application Status
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Track the progress of your insurance claim
      </Typography>

      <Box display="flex" flexDirection={isMobile ? 'column' : 'row'} gap={3}>
        <Box flex={isMobile ? 1 : 2}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
                <Box>
                  <Typography variant="h5" color="primary" fontWeight="bold" gutterBottom>
                    Claim #{claimData.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Submitted on {new Date(claimData.submittedDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Chip
                  label={claimData.status}
                  color={getStatusColor(claimData.status) as any}
                />
              </Box>

              <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={3} mb={3}>
                <Box display="flex" alignItems="center" flex={1}>
                  <CalendarToday sx={{ mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Last Updated
                    </Typography>
                    <Typography variant="body1">
                      {new Date(claimData.lastUpdated).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center" flex={1}>
                  <AttachMoney sx={{ mr: 1, color: 'text.secondary' }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      Estimated Amount
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {claimData.estimatedAmount}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Claim Progress Timeline
              </Typography>
              <Timeline sx={{ mt: 2 }}>
                {claimData.timeline.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineSeparator>
                      <TimelineDot sx={{ p: 0 }}>
                        {getTimelineIcon(item.status)}
                      </TimelineDot>
                      {index < claimData.timeline.length - 1 && <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography variant="h6" component="span">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.date}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        {item.description}
                      </Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </Box>

        <Box flex={isMobile ? 1 : 1} maxWidth={isMobile ? '100%' : '400px'}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Claims Adjuster
              </Typography>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'primary.main',
                    mr: 2,
                    fontSize: '1.5rem',
                  }}
                >
                  {claimData.adjusterName.split(' ').map(n => n[0]).join('')}
                </Avatar>
                <Box>
                  <Typography variant="h6">{claimData.adjusterName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Senior Claims Adjuster
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List dense>
                <ListItem disablePadding sx={{ mb: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={claimData.adjusterPhone}
                  />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={claimData.adjusterEmail}
                  />
                </ListItem>
              </List>

              <Box mt={3} p={2} bgcolor="action.hover" borderRadius={1}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Note:</strong> Your adjuster will contact you within 2-3 business days to schedule the vehicle inspection. Please ensure your vehicle is accessible for the inspection.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default ApplicationStatusPage;