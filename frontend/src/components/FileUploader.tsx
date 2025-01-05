// frontend/src/components/FileUploader.tsx
import { useState } from 'react';
import { Button, Box, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

interface FileUploaderProps {
  setConvertedText: (text: string) => void;
}

const FileUploader = ({ setConvertedText }: FileUploaderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/convert', formData);
      setConvertedText(response.data.text);
    } catch (error: any) {
      console.error('Error converting file:', error);
      setError(error.response?.data?.error || 'ファイルの変換中にエラーが発生しました。');
      setConvertedText('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ my: 2 }}>
      <input
        accept=".pdf,.docx,.pptx,.xlsx,.html,.jpg,.jpeg,.png,.csv,.json,.xml,.mp3,.wav"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'ファイルを選択'}
        </Button>
      </label>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FileUploader;
