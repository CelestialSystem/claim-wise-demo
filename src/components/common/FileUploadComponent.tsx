import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Paper,
  Alert,
} from '@mui/material';
import {
  CloudUpload,
  AttachFile,
  Delete,
  CheckCircle,
} from '@mui/icons-material';

interface FileUploadComponentProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  required?: boolean;
  maxSize?: number; // in MB
  onFileSelect: (files: File | File[]) => void;
  file?: File | null;
  files?: File[];
}

const FileUploadComponent: React.FC<FileUploadComponentProps> = ({
  label,
  accept = '.pdf,.jpg,.jpeg,.png',
  multiple = false,
  required = false,
  maxSize = 10,
  onFileSelect,
  file,
  files = [],
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExtension)) {
      setError(`File type not allowed. Please upload: ${accept}`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const fileArray = Array.from(selectedFiles);
    const validFiles = fileArray.filter(validateFile);

    if (validFiles.length === 0) return;

    if (multiple) {
      onFileSelect(validFiles);
    } else {
      onFileSelect(validFiles[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (indexToRemove?: number) => {
    if (multiple && typeof indexToRemove === 'number') {
      const updatedFiles = files.filter((_, index) => index !== indexToRemove);
      onFileSelect(updatedFiles);
    } else {
      onFileSelect(multiple ? [] : ({} as File));
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const hasFiles = multiple ? files.length > 0 : !!file;

  return (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        {label} {required && <span style={{ color: 'red' }}>*</span>}
      </Typography>
      
      <Paper
        className={`file-upload-zone ${dragOver ? 'dragover' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
        sx={{
          p: 3,
          textAlign: 'center',
          cursor: 'pointer',
          border: hasFiles ? '2px solid' : '2px dashed',
          borderColor: hasFiles ? 'success.main' : 'grey.300',
          backgroundColor: hasFiles ? 'success.50' : 'grey.50',
          transition: 'all 0.3s ease',
          '&:hover': {
            borderColor: hasFiles ? 'success.dark' : 'primary.main',
            backgroundColor: hasFiles ? 'success.100' : 'primary.50',
          },
        }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          style={{ display: 'none' }}
        />
        
        {hasFiles ? (
          <Box>
            <CheckCircle color="success" sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="body1" color="success.main" fontWeight="600">
              {multiple ? `${files.length} file(s) selected` : 'File uploaded successfully'}
            </Typography>
          </Box>
        ) : (
          <Box>
            <CloudUpload sx={{ fontSize: 40, color: 'grey.400', mb: 1 }} />
            <Typography variant="body1" gutterBottom>
              Drag & drop files here or click to browse
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Accepted formats: {accept} (Max: {maxSize}MB)
            </Typography>
          </Box>
        )}
      </Paper>

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}

      {hasFiles && (
        <Box mt={2}>
          {multiple ? (
            files.map((file, index) => (
              <Chip
                key={index}
                icon={<AttachFile />}
                label={file.name}
                onDelete={() => removeFile(index)}
                deleteIcon={<Delete />}
                variant="outlined"
                sx={{ mr: 1, mb: 1 }}
              />
            ))
          ) : file ? (
            <Chip
              icon={<AttachFile />}
              label={file.name}
              onDelete={() => removeFile()}
              deleteIcon={<Delete />}
              variant="outlined"
            />
          ) : null}
        </Box>
      )}

      {hasFiles && (
        <Button
          startIcon={<CloudUpload />}
          onClick={openFileDialog}
          size="small"
          sx={{ mt: 1 }}
        >
          {multiple ? 'Add More Files' : 'Replace File'}
        </Button>
      )}
    </Box>
  );
};

export default FileUploadComponent;