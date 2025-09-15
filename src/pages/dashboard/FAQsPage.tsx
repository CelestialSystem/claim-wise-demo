import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  InputAdornment,
  TextField,
  Button,
} from '@mui/material';
import { AccessTime, Call, Email, ExpandMore, HelpOutline, Search } from '@mui/icons-material';

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    id: '1',
    category: 'Documents',
    question: 'What documents are required for claim submission?',
    answer: 'You need to provide: (1) Insurance policy document, (2) Valid driving license, (3) Vehicle registration certificate, (4) Accident photographs (if available), (5) Police report (FIR), (6) MV-104 form (Motor Vehicle Accident Statement), and (7) NF-2 form (Notice of Loss). The first three documents are mandatory, while others can help expedite your claim process.',
  },
  {
    id: '2',
    category: 'Processing',
    question: 'How long does it take to process a claim?',
    answer: 'Claim processing typically takes 7-15 business days from the date of submission with complete documentation. Simple claims may be processed faster (3-7 days), while complex cases involving extensive damage or investigations may take 20-30 days. You will receive regular updates on your claim status via email and SMS.',
  },
  {
    id: '3',
    category: 'Status',
    question: 'What happens if my claim is rejected?',
    answer: 'If your claim is rejected, you will receive a detailed explanation outlining the reasons for rejection. Common reasons include policy exclusions, insufficient documentation, or pre-existing damage. You have the right to appeal the decision within 30 days by providing additional evidence or clarification. Our customer service team can guide you through the appeal process.',
  },
  {
    id: '4',
    category: 'Tracking',
    question: 'How can I track my claim status?',
    answer: 'You can track your claim status in real-time through your ClaimWise dashboard under the "Application Status" section. You will also receive automatic email and SMS notifications for any status updates. Additionally, you can contact your assigned claims adjuster directly using the contact information provided in your dashboard.',
  },
  {
    id: '5',
    category: 'Changes',
    question: 'Can I edit my submitted claim?',
    answer: 'Once submitted, basic claim information cannot be modified. However, you can add additional supporting documents or provide clarifications through your claims adjuster. If you need to make significant changes, you may need to withdraw the current claim and submit a new one. Contact customer support for guidance on your specific situation.',
  },
  {
    id: '6',
    category: 'Forms',
    question: 'What are MV-104 and NF-2 forms and where can I get them?',
    answer: 'MV-104 (Motor Vehicle Accident Statement) is a standardized form that captures accident details, while NF-2 (Notice of Loss) formally notifies the insurance company about the incident. These forms can be downloaded from your insurer\'s website, obtained from local RTO offices, or requested through ClaimWise. While not always mandatory, these forms can significantly speed up your claim processing.',
  },
  {
    id: '7',
    category: 'Payment',
    question: 'When and how will I receive my claim payment?',
    answer: 'Once your claim is approved, payment is typically processed within 3-5 business days. You will receive payment via direct bank transfer to your registered account. Before payment, you may need to submit additional documents like repair estimates, invoices, or a satisfaction voucher. Large payments may require additional verification steps.',
  },
  {
    id: '8',
    category: 'Support',
    question: 'How can I contact customer support?',
    answer: 'Customer support is available through multiple channels: (1) In-app chat support available 24/7, (2) Phone support at 1-800-CLAIMWISE (1-800-252-4694) from 9 AM to 6 PM, (3) Email support at support@claimwise.com, and (4) Direct contact with your assigned claims adjuster through the dashboard. For urgent matters, please call our emergency helpline.',
  },
  {
    id: '9',
    category: 'Digital',
    question: 'Is digital documentation acceptable for claims?',
    answer: 'Yes, we accept high-quality digital copies of all required documents. Ensure documents are clear, readable, and in PDF or image format (JPG, PNG). Original documents may be required for verification in certain cases. Digital submissions help speed up the initial review process significantly.',
  },
  {
    id: '10',
    category: 'Timeline',
    question: 'What is the deadline for filing a claim after an accident?',
    answer: 'Claims should be filed as soon as possible after an accident, ideally within 24-48 hours. Most insurance policies require claims to be reported within 30 days of the incident. Late reporting may result in claim rejection or delays in processing. Immediate reporting helps preserve evidence and ensures faster claim resolution.',
  },
];

const categories = ['All', 'Documents', 'Processing', 'Status', 'Tracking', 'Changes', 'Forms', 'Payment', 'Support', 'Digital', 'Timeline'];

const FAQsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);

  const filteredFAQs = selectedCategory === 'All'
    ? faqs
    : faqs.filter(faq => faq.category === selectedCategory);

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ width: '75%', margin: 'auto' }}>
      <Box textAlign="center" mb={4}>
        <HelpOutline sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="body1" color="text.secondary" maxWidth="600px" mx="auto">
          Find answers to common questions about motor insurance claims and the ClaimWise platform
        </Typography>
      </Box>

      <Box mb={4}
      sx={{
        display:{xs:'none',sm:'block', md:'block'}
      }}
      >
        <Typography variant="h5" gutterBottom mb={2} >
          Filter by Category
        </Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              variant={selectedCategory === category ? 'filled' : 'outlined'}
              color={selectedCategory === category ? 'primary' : 'default'}
              onClick={() => setSelectedCategory(category)}
              sx={{ cursor: 'pointer' }}
            />
          ))}
        </Box>
      </Box>

      <Card
        sx={{
          boxShadow: "none",
          border: "none",
          background: "transparent",
        }}
      >
        <CardContent sx={{ padding: '0' }}>
          <Typography variant="h5" gutterBottom>
            {selectedCategory === 'All' ? 'All Questions' : `${selectedCategory} Questions`}
            <Chip
              label={filteredFAQs.length}
              size="small"
              sx={{ 
                m: 1 ,
                display:{xs:'none',sm:'inline-flex', md:'inline-flex'}
              }}
            />
          </Typography>

          <Box>
            {filteredFAQs.map((faq) => (
              <Accordion
                key={faq.id}
                expanded={expandedPanel === faq.id}
                onChange={handleAccordionChange(faq.id)}
                disableGutters
                elevation={0}
                square
                sx={{
                  mb: 0,
                  marginInline: {sm:0, md:5},
                  boxShadow: "none",
                  borderBottom: "1px solid #e5e7eb",
                  "&:before": { display: "none" },
                  background: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore sx={{ color: "#555" }} />}
                  aria-controls={`panel${faq.id}-content`}
                  id={`panel${faq.id}-header`}
                  sx={{
                    px: 0,
                    display: "flex",
                    "& .MuiAccordionSummary-content": {
                      margin: 0,
                      width: "100%",
                      display: "block"
                    },
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>

                    <Typography variant="h6" sx={{ fontWeight: 600, py: 3 }}>
                      {faq.question}
                    </Typography>
                    <Chip
                      label={faq.category}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        mr: 3,
                        display:{xs:'none',sm:'inline-flex', md:'inline'}
                      }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 1 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {filteredFAQs.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="text.secondary">
                No FAQs found for the selected category.
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Card sx={{
        mt: 4,
        boxShadow: "none",
      }}>
        <CardContent sx={{p:'30px'}}>
          <Typography variant="h6" gutterBottom>
            Still have questions?
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            If you couldn't find the answer you're looking for, our customer support team is here to help.
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: 'column',
              gap: "18px",
            }}
          >
            <Box sx={{
              display: "flex",
              gap: "15px",
            }}>
              <Call sx={{color:"primary.main"}}/>
              <Typography variant='h6'>+1(800)-234-9857</Typography>
            </Box >
            <Box sx={{
              display: "flex",
              gap: "15px",
            }}>
              <Email sx={{color:"primary.main"}} />
              <Typography variant='h6'>support@claimwise.com</Typography>
            </Box>
            <Box sx={{
              display: "flex",
              gap: "15px",
            }}>
              <AccessTime sx={{color:"primary.main"}} />
              <Typography variant='h6'>Mon-Fri : 9:00AM-6:00PM EST</Typography>
            </Box>
            <Box sx={{
              display: "flex",
              gap: "15px",
            }}>
              <Button size="small" variant='contained' sx={{ padding: "6px 20px" }}>Call Support</Button>
              <Button size="small" variant='outlined' sx={{ padding: "6px 20px" }}>Email Us</Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FAQsPage;