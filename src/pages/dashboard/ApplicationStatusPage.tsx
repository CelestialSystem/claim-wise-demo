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
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const claims = [
  {
    id: "FC-2024-001",
    type: "Vehicle Damage",
    submitted: "2024-07-20",
    updated: "2024-07-25",
    status: "In Progress",
  },
  {
    id: "FC-2024-002",
    type: "Home Burglary",
    submitted: "2024-07-18",
    updated: "2024-07-22",
    status: "Pending Review",
  },
  {
    id: "FC-2024-003",
    type: "Medical Expense",
    submitted: "2024-07-15",
    updated: "2024-07-20",
    status: "Approved",
  },
  {
    id: "FC-2024-004",
    type: "Travel Cancellation",
    submitted: "2024-07-10",
    updated: "2024-07-14",
    status: "Rejected",
  },
  {
    id: "FC-2024-005",
    type: "Property Damage",
    submitted: "2024-07-05",
    updated: "2024-07-08",
    status: "In Progress",
  },
  {
    id: "FC-2024-006",
    type: "Personal Liability",
    submitted: "2024-07-01",
    updated: "2024-07-02",
    status: "Approved",
  },
];


const events = [
  {
    date: "October 24, 2023",
    title: "Claim Submitted",
    description: "Your claim has been successfully submitted and is awaiting initial review.",
    status: "default",
  },
  {
    date: "October 26, 2023",
    title: "Initial Review Completed",
    description: "Our team has completed the initial review of your claim. We are gathering necessary information to proceed.",
    status: "default",
  },
  {
    date: "October 27, 2023",
    title: "Documents Requested",
    description: "Additional documents are required to process your claim. Please upload the requested files through the action area below.",
    status: "active",
    action: true,
  },
  {
    date: "October 29, 2023",
    title: "Assessment In Progress",
    description: "Once documents are received, your claim will move into the assessment phase, where details will be thoroughly evaluated.",
    status: "default",
  },
];

const statusColors: Record<string, string> = {
  Approved: "success",
  Rejected: "error",
  "In Progress": "warning",
  "Pending Review": "info",
};

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
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest First");

  const filteredClaims = claims
    .filter((claim) => statusFilter === "All" || claim.status === statusFilter)
    .sort((a, b) => {
      if (sortOrder === "Newest First") {
        return new Date(b.submitted).getTime() - new Date(a.submitted).getTime();
      }
      return new Date(a.submitted).getTime() - new Date(b.submitted).getTime();
    });

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
      <Box sx={{ p: 3 }}>
      {/* Filters */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
          borderRadius: 2,
          border: "1px solid #eee",
          backgroundColor: "#fff",
          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {/* Filter by Status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight="bold">Filter by Status:</Typography>
          <Select
            size="small"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            sx={{
              minWidth: 160,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
            }}
          >
            <MenuItem value="All">All</MenuItem>
            {Object.keys(statusColors).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Sort By */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography fontWeight="bold">Sort by:</Typography>
          <Select
            size="small"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            sx={{
              minWidth: 160,
              borderRadius: 2,
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ddd" },
            }}
          >
            <MenuItem value="Newest First">Newest First</MenuItem>
            <MenuItem value="Oldest First">Oldest First</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Claims List with Flex */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "flex-start",
        }}
      >
        {filteredClaims.map((claim) => (
          <Card
            key={claim.id}
            sx={{
              flex: "1 1 calc(33.333% - 16px)", // 3 per row
              minWidth: "300px",
              borderRadius: 3,
              boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
              position: "relative",
              "&:hover": { boxShadow: "0 6px 16px rgba(0,0,0,0.15)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Claim ID: {claim.id}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Type:</strong> {claim.type}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Submitted: {claim.submitted}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Last Updated: {claim.updated}
              </Typography>

              {/* Status Badge */}
              <Chip
                label={claim.status}
                color={statusColors[claim.status]}
                variant="filled"
                sx={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  fontWeight: "bold",
                }}
              />
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
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

          <Card sx={{ borderRadius: 3, p: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Claim Timeline
        </Typography>
        <Typography variant="body2" sx={{ mb: 3 }}>
          Current Status:{" "}
          <Typography
            component="span"
            sx={{ color: "primary.main", fontWeight: "500" }}
          >
            Under Review - Awaiting Documents
          </Typography>
        </Typography>

        <Timeline
          sx={{
            p: 0,
            m: 0,
            "& .MuiTimelineItem-root": {
              minHeight: "auto",
              "&::before": { flex: 0, padding: 0 }, // removes extra left space
            },
          }}
        >
          {events.map((event, index) => (
            <TimelineItem key={index}>
              {/* Dot + line */}
              <TimelineSeparator>
                <TimelineDot
                  color={event.status === "active" ? "primary" : "grey"}
                  variant={event.status === "active" ? "filled" : "outlined"}
                />
                {index < events.length - 1 && (
                  <TimelineConnector
                    sx={{
                      bgcolor:
                        event.status === "active"
                          ? "primary.main"
                          : "grey.400",
                    }}
                  />
                )}
              </TimelineSeparator>

              {/* Right side content (title + desc + date) */}
              <TimelineContent sx={{ pb: 4 }}>
                <Typography fontWeight="bold">{event.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                {/* Date shown at bottom right */}
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", mt: 1, fontStyle: "italic" }}
                >
                  {event.date}
                </Typography>

                {/* Special Action Card */}
                {event.action && (
                  <Card
                    variant="outlined"
                    sx={{
                      mt: 2,
                      borderRadius: 2,
                      borderColor: "grey.300",
                      bgcolor: "grey.50",
                    }}
                  >
                    <CardContent>
                      <Typography fontWeight="bold">Action Required</Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        Upload Document
                      </Typography>
                      <Button
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        fullWidth
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          bgcolor: "primary.light",
                          "&:hover": { bgcolor: "primary.main" },
                        }}
                      >
                        Upload Documents
                      </Button>
                    </CardContent>
                  </Card>
                )}
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