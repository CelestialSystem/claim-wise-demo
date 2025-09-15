import { Download, Search, Visibility } from "@mui/icons-material";
import { Box, Button, Card, CardContent, Chip, InputAdornment, List, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from '@mui/material/usePagination';

export interface Claim {
    id: string;
    claimant: string;
    fraudScore: number;
    status: 'Approved' | 'Pending' | 'Flagged';
}

export const mockClaims: Claim[] = [
    {
        id: 'CL-2024-001',
        claimant: 'Alice Johnson',
        fraudScore: 88,
        status: 'Flagged',
    },
    {
        id: 'CL-2024-002',
        claimant: 'Bob Williams',
        fraudScore: 35,
        status: 'Approved',
    },
    {
        id: 'CL-2024-003',
        claimant: 'Carol Davis',
        fraudScore: 62,
        status: 'Pending',
    },
    {
        id: 'CL-2024-004',
        claimant: 'David Green',
        fraudScore: 12,
        status: 'Approved',
    },
    {
        id: 'CL-2024-005',
        claimant: 'Emily White',
        fraudScore: 79,
        status: 'Pending',
    },
    {
        id: 'CL-2024-006',
        claimant: 'Frank Black',
        fraudScore: 92,
        status: 'Flagged',
    },
    {
        id: 'CL-2024-002',
        claimant: 'Bob Williams',
        fraudScore: 35,
        status: 'Approved',
    },
    {
        id: 'CL-2024-003',
        claimant: 'Carol Davis',
        fraudScore: 62,
        status: 'Pending',
    },
    {
        id: 'CL-2024-006',
        claimant: 'Frank Black',
        fraudScore: 92,
        status: 'Flagged',
    },
];

const statusColors: Record<string, string> = {
    Approved: "success",
    Pending: "info",
    Flagged: "error",
};

export default function ClaimTablePage() {
    const [claims] = useState<Claim[]>(mockClaims);
    const navigate = useNavigate();
    const [statusFilter, setStatusFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const { items } = usePagination({
        count: 5,
    });


    const filteredClaims = claims.filter((claim) => {
        const matchesStatus = statusFilter === "All" || claim.status === statusFilter;
        const matchesSearch =
            claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            claim.claimant.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesStatus && matchesSearch;
    });

    const getFraudScoreColor = (score: number) => {
        if (score >= 80) return "error";
        if (score >= 50) return "info";
        return "success";
    };

    const getStatusColor = (status: Claim["status"]) => {
        switch (status) {
            case "Approved":
                return "success";
            case "Pending":
                return "info";
            case "Flagged":
                return "error";
            default:
                return "default";
        }
    };

    return (
        <Box>
            <Box>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Claims table
                </Typography>
                <Typography variant="body1" color="text.secondary" mb={4}>
                    Keep track of your claim history in one place
                </Typography>
            </Box>
            <Card
                sx={{
                    boxShadow: "none",
                    marginBottom: "24px"
                }}
            >
                <CardContent sx={{
                    padding: "16px !important",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                        }}
                    >
                        {/* Search filter */}
                        <TextField
                            variant="outlined"
                            placeholder="Search Claims by ID or Name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            size="small"
                            sx={{ width: "300px" }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search sx={{ color: "text.secondary" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {/* Filter by Status */}
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexShrink: 0
                        }}>
                            <Typography fontWeight="bold">Filter by Status:</Typography>
                            <Select
                                size="small"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                sx={{
                                    minWidth: 160,
                                    '& .MuiInputBase-input': {
                                        padding: '12px',
                                        borderRadius: '10px',
                                    },
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
                    </Box>
                    {/* Export button */}
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Download />}
                        sx={{ textTransform: "none", padding: "5px 20px" }}
                    >
                        Export
                    </Button>
                </CardContent>
            </Card>
            <Card sx={{ boxShadow: "none" }}>
                <CardContent>

                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ padding: "10px" }}><strong>Claim ID</strong></TableCell>
                                    <TableCell sx={{ padding: "10px" }}><strong>Claimant</strong></TableCell>
                                    <TableCell sx={{ padding: "10px" }}><strong>Fraud Score</strong></TableCell>
                                    <TableCell sx={{ padding: "10px" }}><strong>Status</strong></TableCell>
                                    <TableCell sx={{ padding: "10px" }}><strong>Actions</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredClaims.map((claim) => (
                                    <TableRow key={claim.id} hover>
                                        <TableCell sx={{ padding: "10px" }}>
                                            <Typography variant="body2" color="primary" fontWeight="600">
                                                {claim.id}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ padding: "10px" }}>{claim.claimant}</TableCell>
                                        <TableCell sx={{ padding: "10px" }}>                                                <Chip
                                            label={claim.fraudScore}
                                            color={getFraudScoreColor(claim.fraudScore) as any}
                                            size="small"
                                        /></TableCell>
                                        <TableCell sx={{ padding: "10px" }}>
                                            <Chip
                                                label={claim.status}
                                                color={getStatusColor(claim.status) as any}
                                                size="small"
                                            />
                                        </TableCell>
                                        <TableCell sx={{ padding: "10px" }}>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                startIcon={<Visibility />}
                                                onClick={() => navigate('/status')}
                                                sx={{ padding: "5px 10px" }}
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
            <List sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}>
                {items.map(({ page, type, selected, ...item }, index) => {
                    let children = null;

                    if (type === "start-ellipsis" || type === "end-ellipsis") {
                        children = (
                            <Button
                                disabled
                                sx={{minWidth:'20px', padding:'5px 13px',fontWeight: "bold", color: "text.secondary" }}
                            >
                                …
                            </Button>
                        );
                    } else if (type === "page") {
                        children = (
                            <Button
                                variant={selected ? "contained" : "outlined"}
                                color="primary"
                                size="small"
                                sx={{
                                    minWidth:'20px',
                                    fontWeight: selected ? "bold" : "normal",
                                    borderRadius: "8px",
                                    textTransform: "none",
                                    padding:'5px 13px'
                                }}
                                {...item}
                            >
                                {page}
                            </Button>
                        );
                    } else {
                        // "previous" / "next"
                        children = (
                            <Button
                                variant="outlined"
                                color="primary"
                                size="small"
                                sx={{
                                    padding:'5px 10px',
                                    borderRadius: "8px",
                                    textTransform: "capitalize",
                                }}
                                {...item}
                            >
                                {type}
                            </Button>
                        );
                    }

                    return <li key={index}>{children}</li>;
                })}
            </List>

        </Box>
    );
}
